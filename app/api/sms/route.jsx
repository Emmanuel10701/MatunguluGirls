import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";

// ==================== TOKEN VERIFICATION ====================
class DeviceTokenManager {
  static validateTokensFromHeaders(headers, options = {}) {
    try {
      const adminToken = headers.get('x-admin-token') || headers.get('authorization')?.replace('Bearer ', '');
      const deviceToken = headers.get('x-device-token');

      if (!adminToken) {
        return { valid: false, reason: 'no_admin_token', message: 'Admin token is required' };
      }

      if (!deviceToken) {
        return { valid: false, reason: 'no_device_token', message: 'Device token is required' };
      }

      const adminParts = adminToken.split('.');
      if (adminParts.length !== 3) {
        return { valid: false, reason: 'invalid_admin_token_format', message: 'Invalid admin token format' };
      }

      const deviceValid = this.validateDeviceToken(deviceToken);
      if (!deviceValid.valid) {
        return { 
          valid: false, 
          reason: `device_${deviceValid.reason}`,
          message: `Device token ${deviceValid.reason}: ${deviceValid.error || ''}`
        };
      }

      let adminPayload;
      try {
        adminPayload = JSON.parse(atob(adminParts[1]));
        
        const currentTime = Date.now() / 1000;
        if (adminPayload.exp < currentTime) {
          return { valid: false, reason: 'admin_token_expired', message: 'Admin token has expired' };
        }
        
        const userRole = adminPayload.role || adminPayload.userRole;
        const validRoles = ['ADMIN', 'SUPER_ADMIN', 'administrator', 'PRINCIPAL', 'TEACHER', 'HR_MANAGER'];
        
        if (!userRole || !validRoles.includes(userRole.toUpperCase())) {
          return { 
            valid: false, 
            reason: 'invalid_role', 
            message: 'User does not have permission to send SMS campaigns' 
          };
        }
        
      } catch (error) {
        return { valid: false, reason: 'invalid_admin_token', message: 'Invalid admin token' };
      }

      console.log('✅ SMS campaign authentication successful for user:', adminPayload.name || 'Unknown');
      
      return { 
        valid: true, 
        user: {
          id: adminPayload.userId || adminPayload.id,
          name: adminPayload.name,
          email: adminPayload.email,
          role: adminPayload.role || adminPayload.userRole
        },
        deviceInfo: deviceValid.payload
      };

    } catch (error) {
      console.error('❌ Token validation error:', error);
      return { 
        valid: false, 
        reason: 'validation_error', 
        message: 'Authentication validation failed',
        error: error.message 
      };
    }
  }

  static validateDeviceToken(token) {
    try {
      const payloadStr = Buffer.from(token, 'base64').toString('utf-8');
      const payload = JSON.parse(payloadStr);
      
      if (payload.exp && payload.exp * 1000 <= Date.now()) {
        return { valid: false, reason: 'expired', payload, error: 'Device token has expired' };
      }
      
      const createdAt = new Date(payload.createdAt || payload.iat * 1000);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      
      if (createdAt < thirtyDaysAgo) {
        return { valid: false, reason: 'age_expired', payload, error: 'Device token is too old' };
      }
      
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, reason: 'invalid_format', error: error.message };
    }
  }
}

const authenticateRequest = (req) => {
  const headers = req.headers;
  
  const validationResult = DeviceTokenManager.validateTokensFromHeaders(headers);
  
  if (!validationResult.valid) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { 
          success: false, 
          error: "Access Denied",
          message: "Authentication required to send SMS campaigns.",
          details: validationResult.message
        },
        { status: 401 }
      )
    };
  }

  return {
    authenticated: true,
    user: validationResult.user,
    deviceInfo: validationResult.deviceInfo
  };
};
// ==================== END TOKEN VERIFICATION ====================

// ====================================================================
// CELCOM AFRICA CONFIGURATION
// ====================================================================
const CELCOM_API_KEY = process.env.CELCOM_API_KEY;
const CELCOM_PARTNER_ID = process.env.CELCOM_PARTNER_ID;
const CELCOM_SHORTCODE = process.env.CELCOM_SHORTCODE;

if (!CELCOM_API_KEY || !CELCOM_PARTNER_ID || !CELCOM_SHORTCODE) {
  console.error("❌ Missing Celcom Africa credentials. Please set CELCOM_API_KEY, CELCOM_PARTNER_ID, and CELCOM_SHORTCODE in .env");
}

// ====================================================================
// BALANCE CHECK FUNCTION - NEW
// ====================================================================
async function checkCelcomBalance() {
  try {
    const response = await fetch("https://isms.celcomafrica.com/api/services/balance/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apikey: CELCOM_API_KEY,
        partnerID: CELCOM_PARTNER_ID
      })
    });

    const data = await response.json();
    
    // Parse balance from response
    // Celcom returns something like: { "balance": "150.50" }
    const balance = parseFloat(data.balance) || 0;
    
    return {
      success: true,
      balance: balance,
      currency: "credits",
      canSend: balance >= 1 // At least 1 credit needed per SMS
    };
  } catch (error) {
    console.error("❌ Failed to check Celcom balance:", error);
    return {
      success: false,
      balance: 0,
      currency: "credits",
      canSend: false,
      error: error.message
    };
  }
}

// ====================================================================
// NEW ENDPOINT: GET BALANCE
// ====================================================================
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();
    
    // --- Balance check (still requires authentication) ---
    if (url.searchParams.has('balance') || path === 'balance') {
      const auth = authenticateRequest(req);
      if (!auth.authenticated) {
        return auth.response;
      }
      
      const balanceInfo = await checkCelcomBalance();
      
      return NextResponse.json({
        success: true,
        ...balanceInfo,
        message: balanceInfo.canSend 
          ? `Your balance is ${balanceInfo.balance} credits. You can send SMS.`
          : `Insufficient credits. Current balance: ${balanceInfo.balance} credits. Please top up.`
      });
    }
    
    // ==================== GET ALL CAMPAIGNS - NO AUTH REQUIRED ====================
    const searchParams = url.searchParams;
    
    const where = {};
    
    if (searchParams.has('status')) {
      where.status = searchParams.get('status');
    }
    
    if (searchParams.has('recipientType')) {
      where.recipientType = searchParams.get('recipientType');
    }
    
    if (searchParams.has('search')) {
      const searchTerm = searchParams.get('search');
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { message: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }
    
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(1000, Math.max(1, parseInt(searchParams.get('limit') || '20')));
    const skip = (page - 1) * limit;
    
    // Get all campaigns including drafts
    const [totalCount, campaigns] = await Promise.all([
      prisma.smsCampaign.count({ where }),
      prisma.smsCampaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }, // Show newest first
      })
    ]);
    
    console.log(`📊 Found ${campaigns.length} campaigns (${campaigns.filter(c => c.status === 'draft').length} drafts, ${campaigns.filter(c => c.status === 'sent').length} sent)`);
    
    const formattedCampaigns = campaigns.map(campaign => {
      const recipientCount = campaign.recipients ? campaign.recipients.split(',').length : 0;
      
      return {
        id: campaign.id,
        title: campaign.title,
        message: campaign.message.length > 100 
          ? campaign.message.substring(0, 100) + '...' 
          : campaign.message,
        recipients: campaign.recipients,
        recipientCount,
        recipientType: campaign.recipientType || 'all',
        recipientTypeLabel: getRecipientTypeLabel(campaign.recipientType || 'all'),
        status: campaign.status, // 'draft' or 'sent'
        sentAt: campaign.sentAt,
        sentCount: campaign.sentCount,
        failedCount: campaign.failedCount,
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt,
        lowCreditSaved: campaign.lowCreditSaved || false,
        successRate: campaign.sentCount && recipientCount > 0 
          ? Math.round((campaign.sentCount / recipientCount) * 100)
          : 0
      };
    });
    
    const summary = {
      totalCampaigns: totalCount,
      sentMessages: formattedCampaigns.reduce((sum, c) => sum + (c.sentCount || 0), 0),
      failedMessages: formattedCampaigns.reduce((sum, c) => sum + (c.failedCount || 0), 0),
      totalRecipients: formattedCampaigns.reduce((sum, c) => sum + (c.recipientCount || 0), 0),
      draftCampaigns: formattedCampaigns.filter(c => c.status === 'draft').length,
      sentCampaigns: formattedCampaigns.filter(c => c.status === 'sent').length,
      lowCreditDrafts: formattedCampaigns.filter(c => c.status === 'draft' && c.lowCreditSaved).length,
      averageSuccessRate: formattedCampaigns.length > 0
        ? Math.round(formattedCampaigns.reduce((sum, c) => sum + c.successRate, 0) / formattedCampaigns.length)
        : 0
    };
    
    return NextResponse.json({
      success: true,
      campaigns: formattedCampaigns,
      summary,
      senderInfo: {
        id: CELCOM_SHORTCODE,
        type: "shortcode"
      },
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page * limit < totalCount,
        hasPreviousPage: page > 1
      }
    }, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
      }
    });
    
  } catch (error) {
    console.error("GET /api/sms Error:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Failed to retrieve campaigns"
      },
      { status: 500 }
    );
  }
}
// ====================================================================
// HELPER FUNCTIONS
// ====================================================================

function getRecipientTypeLabel(type) {
  const labels = {
    'all': 'All Recipients',
    'parents': 'Parents & Guardians',
    'teachers': 'Teaching Staff',
    'administration': 'Administration',
    'bom': 'Board of Management',
    'support': 'Support Staff',
    'staff': 'All School Staff'
  };
  return labels[type] || type;
}

// Validate phone numbers function
function validatePhoneNumbers(phoneNumbers) {
  const valid = [];
  const invalid = [];
  
  // Production validation - Kenyan phone numbers
  // Accepts: 0712345678, 254712345678, +254712345678
  const regex = /^(?:(?:\+?254)|0)?(7[0-9]{8})$/;
  
  phoneNumbers.forEach(num => {
    const cleaned = num.trim().replace(/\s+/g, '').replace(/-/g, '');
    const match = cleaned.match(regex);
    
    if (match) {
      const subscriberNumber = match[1];
      // Always format as 254XXXXXXXXX (12 digits)
      const formatted = '254' + subscriberNumber;
      
      // Verify final length (should be 12 digits)
      if (formatted.length === 12 && /^[0-9]+$/.test(formatted)) {
        valid.push(formatted);
      } else {
        invalid.push(num);
      }
    } else {
      invalid.push(num);
    }
  });
  
  return { valid, invalid };
}

/**
 * Send SMS campaign using Celcom Africa API
 * MODIFIED: Now returns detailed info about low credit
 */
async function sendSmsCampaign(campaign) {
  const recipients = campaign.recipients.split(",").map(r => r.trim());
  const message = campaign.message;

  const sent = [];
  const failed = [];

  console.log(`📱 Sending SMS with shortcode: "${CELCOM_SHORTCODE}" via Celcom Africa`);

  const BATCH_SIZE = 100;
  let lowCreditDetected = false;
  let currentBalance = 0;
  let requiredCredit = 0;

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    try {
      const mobileList = batch.join(",");

      const requestBody = {
        apikey: CELCOM_API_KEY,
        partnerID: CELCOM_PARTNER_ID,
        message: message,
        shortcode: CELCOM_SHORTCODE,
        mobile: mobileList,
        pass_type: "plain",
      };

      console.log(`📱 Sending batch ${Math.floor(i/BATCH_SIZE) + 1} to ${batch.length} numbers`);

      const response = await fetch("https://isms.celcomafrica.com/api/services/sendsms/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(`📱 Response:`, JSON.stringify(data, null, 2));

      if (data.responses && Array.isArray(data.responses)) {
        data.responses.forEach((item) => {
          const logEntry = {
            campaignId: campaign.id,
            phoneNumber: item.mobile?.toString() || '',
            message,
            providerMessageId: item.messageid?.toString() || null,
            status: item["response-code"] === 200 ? "success" : "failed",
            errorMessage: item["response-description"] !== "Success" ? item["response-description"] : null,
          };
          
          // Check for low credit (402)
          if (item["response-code"] === 402) {
            lowCreditDetected = true;
            // Parse balance from error message
            const balanceMatch = item["response-description"]?.match(/Current balance ([\d.]+)/);
            const requiredMatch = item["response-description"]?.match(/Required ([\d.]+)/);
            currentBalance = balanceMatch ? parseFloat(balanceMatch[1]) : 0;
            requiredCredit = requiredMatch ? parseFloat(requiredMatch[1]) : 1;
            
            failed.push(logEntry);
          } else if (item["response-code"] === 200) {
            sent.push(logEntry);
          } else {
            failed.push(logEntry);
          }
        });
      } else {
        console.warn("⚠️ Unexpected API response format", data);
        batch.forEach((phone) => {
          failed.push({
            campaignId: campaign.id,
            phoneNumber: phone.toString(),
            message,
            providerMessageId: null,
            status: "failed",
            errorMessage: "Invalid API response",
          });
        });
      }
    } catch (error) {
      console.error(`❌ Batch failed:`, error.message);
      batch.forEach((phone) => {
        failed.push({
          campaignId: campaign.id,
          phoneNumber: phone.toString(),
          message,
          providerMessageId: null,
          status: "failed",
          errorMessage: error.message,
        });
      });
    }

    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Save logs to database
  if (sent.length > 0) {
    await prisma.smsLog.createMany({ data: sent });
  }
  if (failed.length > 0) {
    await prisma.smsLog.createMany({ data: failed });
  }

  const summary = {
    total: recipients.length,
    successful: sent.length,
    failed: failed.length,
    successRate: recipients.length > 0 ? Math.round((sent.length / recipients.length) * 100) : 0,
  };

  return { 
    sent, 
    failed, 
    summary,
    lowCreditDetected,
    currentBalance,
    requiredCredit
  };
}

// ====================================================================
// POST HANDLER - Create a new SMS campaign
// ====================================================================
// POST HANDLER - Create a new SMS campaign
// MODIFIED: Properly save drafts to database
// ====================================================================
export async function POST(req) {
  try {
    // ==================== IDEMPOTENCY CHECK ====================
    const idempotencyKey = req.headers.get('x-idempotency-key');
    
    if (idempotencyKey) {
      const existingCampaign = await prisma.smsCampaign.findFirst({
        where: { idempotencyKey }
      });
      
      if (existingCampaign) {
        console.log('🔄 Idempotent request detected, returning existing campaign:', existingCampaign.id);
        
        const recipientCount = existingCampaign.recipients ? existingCampaign.recipients.split(',').length : 0;
        
        const responseData = {
          id: existingCampaign.id,
          title: existingCampaign.title,
          message: existingCampaign.message,
          recipients: existingCampaign.recipients,
          recipientCount,
          recipientType: existingCampaign.recipientType || 'all',
          recipientTypeLabel: getRecipientTypeLabel(existingCampaign.recipientType || 'all'),
          status: existingCampaign.status,
          sentAt: existingCampaign.sentAt,
          sentCount: existingCampaign.sentCount,
          failedCount: existingCampaign.failedCount,
          lowCreditSaved: existingCampaign.lowCreditSaved || false,
          senderId: CELCOM_SHORTCODE,
          createdAt: existingCampaign.createdAt,
          updatedAt: existingCampaign.updatedAt,
        };

        return NextResponse.json({
          success: true,
          campaign: responseData,
          message: "Campaign already processed (idempotent request)"
        });
      }
    }
    // ==================== END IDEMPOTENCY CHECK ====================

    // ==================== AUTHENTICATION ====================
    const auth = authenticateRequest(req);
    if (!auth.authenticated) {
      return auth.response;
    }

    console.log("📱 POST /api/sms - Creating SMS campaign");
    console.log(`Request from: ${auth.user.name} (${auth.user.role})`);
    console.log(`Using shortcode: "${CELCOM_SHORTCODE}"`);
    // ==================== END AUTHENTICATION ====================

    // ==================== REQUEST PARSING ====================
    const { title, message, recipientType, recipients, status = "draft" } = await req.json();

    if (!title || !message || !recipients) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Title, message, and recipients are required" 
        },
        { status: 400 }
      );
    }

    if (message.length > 1600) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Message is too long. Maximum 1600 characters allowed." 
        },
        { status: 400 }
      );
    }

    const phoneList = recipients.split(",").map(p => p.trim()).filter(Boolean);
    const { valid, invalid } = validatePhoneNumbers(phoneList);
    
    if (invalid.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid phone numbers detected",
          invalidNumbers: invalid 
        },
        { status: 400 }
      );
    }

    const uniquePhones = [...new Set(valid)];
    // ==================== END REQUEST PARSING ====================

    // ==================== DATABASE OPERATION ====================
    // Always create the campaign in database first
    const campaignData = {
      title,
      message,
      recipients: uniquePhones.join(", "),
      recipientType: recipientType || "all",
      status: "draft", // Always start as draft, will update to 'sent' only if successful
      lowCreditSaved: false,
    };

    if (idempotencyKey) {
      campaignData.idempotencyKey = idempotencyKey;
    }

    // Create the campaign in database
    const campaign = await prisma.smsCampaign.create({
      data: campaignData,
    });
    
    console.log(`✅ Campaign created in database with ID: ${campaign.id}, status: draft`);
    // ==================== END DATABASE OPERATION ====================

    // ==================== SMS SENDING (ONLY IF STATUS IS "sent") ====================
    let smsResults = null;
    let finalStatus = "draft"; // Default to draft
    let lowCreditSaved = false;

    // Only attempt to send if status is explicitly "sent"
    if (status === "sent") {
      try {
        // Check balance first
        const balanceInfo = await checkCelcomBalance();
        
        // If insufficient credit, keep as draft
        if (!balanceInfo.canSend) {
          console.log(`⚠️ Insufficient credit (${balanceInfo.balance}). Keeping as draft.`);
          
          // Update campaign to mark low credit
          await prisma.smsCampaign.update({
            where: { id: campaign.id },
            data: {
              lowCreditSaved: true,
            },
          });
          
          lowCreditSaved = true;
          finalStatus = "draft";
          
          smsResults = {
            lowCreditDetected: true,
            currentBalance: balanceInfo.balance,
            requiredCredit: 1,
            summary: {
              total: uniquePhones.length,
              successful: 0,
              failed: 0,
              successRate: 0
            }
          };
        } else {
          // Sufficient credit, proceed with sending
          smsResults = await sendSmsCampaign(campaign);
          
          // Check if low credit was detected during sending
          if (smsResults.lowCreditDetected) {
            // Update campaign to draft with low credit flag
            await prisma.smsCampaign.update({
              where: { id: campaign.id },
              data: {
                status: 'draft',
                lowCreditSaved: true,
                sentCount: smsResults.summary.successful,
                failedCount: smsResults.summary.failed,
              },
            });
            
            finalStatus = 'draft';
            lowCreditSaved = true;
          } else {
            // All good - update to sent
            await prisma.smsCampaign.update({
              where: { id: campaign.id },
              data: {
                status: 'sent',
                sentAt: new Date(),
                sentCount: smsResults.summary.successful,
                failedCount: smsResults.summary.failed,
                lowCreditSaved: false,
              },
            });
            
            finalStatus = 'sent';
          }
        }
      } catch (smsError) {
        console.error("SMS sending failed:", smsError);
        
        // Update campaign to mark failure but keep as draft
        await prisma.smsCampaign.update({
          where: { id: campaign.id },
          data: {
            lowCreditSaved: true,
          },
        });
        
        finalStatus = 'draft';
        lowCreditSaved = true;
        
        smsResults = {
          error: smsError.message,
          summary: {
            total: uniquePhones.length,
            successful: 0,
            failed: 0,
            successRate: 0
          }
        };
      }
    } else {
      // If status is "draft", we're done - campaign already saved as draft
      console.log(`📝 Campaign saved as draft (no SMS sending attempted)`);
    }
    // ==================== END SMS SENDING ====================

    // ==================== FETCH FINAL CAMPAIGN DATA ====================
    // Get the updated campaign from database
    const updatedCampaign = await prisma.smsCampaign.findUnique({
      where: { id: campaign.id }
    });
    // ==================== END FETCH FINAL CAMPAIGN DATA ====================

    // ==================== RESPONSE FORMATTING ====================
    const responseData = {
      id: updatedCampaign.id,
      title: updatedCampaign.title,
      message: updatedCampaign.message,
      recipients: updatedCampaign.recipients,
      recipientCount: uniquePhones.length,
      recipientType: updatedCampaign.recipientType || 'all',
      recipientTypeLabel: getRecipientTypeLabel(updatedCampaign.recipientType || 'all'),
      status: updatedCampaign.status, // This will be 'draft' for draft saves
      sentAt: updatedCampaign.sentAt,
      sentCount: updatedCampaign.sentCount || 0,
      failedCount: updatedCampaign.failedCount || 0,
      lowCreditSaved: updatedCampaign.lowCreditSaved || false,
      senderId: CELCOM_SHORTCODE,
      createdAt: updatedCampaign.createdAt,
      updatedAt: updatedCampaign.updatedAt,
    };

    // Prepare appropriate message
    let responseMessage = "";
    if (status === "sent") {
      if (lowCreditSaved) {
        responseMessage = `⚠️ Campaign saved as draft due to low credit. Current balance: ${smsResults?.currentBalance || 'unknown'} credits. Please top up to send.`;
      } else {
        responseMessage = `✅ Campaign created and ${smsResults?.summary?.successful || 0} messages sent successfully`;
      }
    } else {
      responseMessage = "✅ Campaign saved as draft successfully";
    }

    return NextResponse.json(
      {
        success: true,
        campaign: responseData,
        smsResults,
        lowCreditInfo: lowCreditSaved ? {
          detected: true,
          currentBalance: smsResults?.currentBalance,
          requiredCredit: smsResults?.requiredCredit || 1,
          message: `Insufficient credits. Current: ${smsResults?.currentBalance}, Required: ${smsResults?.requiredCredit || 1} per message`
        } : null,
        message: responseMessage
      },
      { 
        status: 201,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
    // ==================== END RESPONSE FORMATTING ====================

  } catch (error) {
    console.error("POST /api/sms Error:", error);
    
    let statusCode = 500;
    let errorMessage = error.message || "Failed to create campaign";
    
    if (error.code === 'P2000') {
      statusCode = 400;
      errorMessage = "Data too long for database column";
    } else if (error.code === 'P2002') {
      statusCode = 409;
      errorMessage = "A campaign with similar data already exists";
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: error.message
      },
      { status: statusCode }
    );
  }
}
// ====================================================================
// PATCH HANDLER - Update campaign status (for sending)
// MODIFIED: Auto-draft when low credit
// ====================================================================
export async function PATCH(req, { params }) {
  try {
    const auth = authenticateRequest(req);
    if (!auth.authenticated) {
      return auth.response;
    }

    const { id } = params;
    const { status } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Campaign ID is required" },
        { status: 400 }
      );
    }

    const campaign = await prisma.smsCampaign.findUnique({
      where: { id }
    });

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: "Campaign not found" },
        { status: 404 }
      );
    }

    // If changing to "sent", attempt to send SMS
    if (status === "sent" && campaign.status !== "sent") {
      // Check balance first
      const balanceInfo = await checkCelcomBalance();
      
      if (!balanceInfo.canSend) {
        return NextResponse.json({
          success: false,
          error: "INSUFFICIENT_CREDIT",
          message: `Cannot send SMS. Current balance: ${balanceInfo.balance} credits. At least 1 credit required per message.`,
          balance: balanceInfo.balance,
          requiredCredit: 1,
          autoSavedAsDraft: true,
          campaign: {
            ...campaign,
            status: 'draft',
            lowCreditSaved: true
          }
        }, { status: 402 }); // 402 Payment Required
      }

      const smsResults = await sendSmsCampaign(campaign);
      
      // Check if low credit was detected during sending
      if (smsResults.lowCreditDetected) {
        // Update as draft with low credit flag
        const updatedCampaign = await prisma.smsCampaign.update({
          where: { id },
          data: {
            status: 'draft',
            lowCreditSaved: true,
            sentCount: smsResults.summary.successful,
            failedCount: smsResults.summary.failed,
          }
        });

        return NextResponse.json({
          success: false,
          error: "INSUFFICIENT_CREDIT",
          message: `Sending interrupted due to low credit. Current balance: ${smsResults.currentBalance}, Required: ${smsResults.requiredCredit} per message. Campaign saved as draft.`,
          balance: smsResults.currentBalance,
          requiredCredit: smsResults.requiredCredit,
          autoSavedAsDraft: true,
          campaign: updatedCampaign,
          smsResults
        }, { status: 402 });
      }

      // Update as sent with counts
      const updatedCampaign = await prisma.smsCampaign.update({
        where: { id },
        data: {
          status: 'sent',
          sentAt: new Date(),
          sentCount: smsResults.summary.successful,
          failedCount: smsResults.summary.failed,
          lowCreditSaved: false,
        }
      });

      return NextResponse.json({
        success: true,
        campaign: updatedCampaign,
        smsResults,
        message: `Campaign sent with ${smsResults.summary.successful} successful deliveries`
      });
    }

    // For other status changes (e.g., draft -> draft, just update status)
    const updatedCampaign = await prisma.smsCampaign.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      campaign: updatedCampaign,
      message: `Campaign status updated to ${status}`
    });

  } catch (error) {
    console.error("PATCH /api/sms Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}