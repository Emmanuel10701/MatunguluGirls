import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";

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
            message: 'User does not have permission to manage SMS campaigns' 
          };
        }
        
      } catch (error) {
        return { valid: false, reason: 'invalid_admin_token', message: 'Invalid admin token' };
      }

      console.log('✅ SMS campaign management authentication successful');
      
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
          message: "Authentication required to manage SMS campaigns.",
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
// BALANCE CHECK FUNCTION
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
    
    const balance = parseFloat(data.balance) || 0;
    
    return {
      success: true,
      balance: balance,
      currency: "credits",
      canSend: balance >= 1
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

function validatePhoneNumbers(phoneNumbers) {
  const valid = [];
  const invalid = [];
  
  // Kenyan phone numbers: 07XX XXX XXX, 2547XX XXX XXX, +2547XX XXX XXX
  const regex = /^(?:(?:\+?254)|0)?(7[0-9]{8})$/;
  
  phoneNumbers.forEach(num => {
    const cleaned = num.trim().replace(/\s+/g, '').replace(/-/g, '');
    
    const match = cleaned.match(regex);
    
    if (match) {
      const subscriberNumber = match[1];
      const formatted = '254' + subscriberNumber;
      
      if (formatted.length === 12) {
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
 * Send SMS using Celcom Africa API with low credit detection
 */
async function sendCelcomSms(campaignId, phoneNumbers, message) {
  const sent = [];
  const failed = [];
  let lowCreditDetected = false;
  let currentBalance = 0;
  let requiredCredit = 0;
  
  const BATCH_SIZE = 100;
  
  for (let i = 0; i < phoneNumbers.length; i += BATCH_SIZE) {
    const batch = phoneNumbers.slice(i, i + BATCH_SIZE);
    
    try {
      const mobileList = batch.join(",");
      
      const requestBody = {
        apikey: CELCOM_API_KEY,
        partnerID: CELCOM_PARTNER_ID,
        message: message,
        shortcode: CELCOM_SHORTCODE,
        mobile: mobileList,
        pass_type: "plain"
      };
      
      console.log(`📱 Sending batch ${Math.floor(i/BATCH_SIZE) + 1} to ${batch.length} numbers via Celcom Africa`);
      
      const response = await fetch("https://isms.celcomafrica.com/api/services/sendsms/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      
      const data = await response.json();
      
      if (data.responses && Array.isArray(data.responses)) {
        data.responses.forEach((item) => {
          const logEntry = {
            campaignId: campaignId,
            phoneNumber: item.mobile?.toString() || '',
            message,
            providerMessageId: item.messageid?.toString() || null,
            status: item["response-code"] === 200 ? "success" : "failed",
            errorMessage: item["response-description"] !== "Success" ? item["response-description"] : null,
          };
          
          // Check for low credit (402)
          if (item["response-code"] === 402) {
            lowCreditDetected = true;
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
        batch.forEach(phone => {
          failed.push({
            campaignId,
            phoneNumber: phone,
            message,
            providerMessageId: null,
            status: "failed",
            errorMessage: "Invalid API response from Celcom",
          });
        });
      }
      
    } catch (error) {
      console.error(`❌ Batch failed:`, error.message);
      batch.forEach(phone => {
        failed.push({
          campaignId,
          phoneNumber: phone,
          message,
          providerMessageId: null,
          status: "failed",
          errorMessage: error.message,
        });
      });
    }
    
    if (i + BATCH_SIZE < phoneNumbers.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return { 
    sent, 
    failed,
    lowCreditDetected,
    currentBalance,
    requiredCredit
  };
}

// ====================================================================
// API HANDLERS
// ====================================================================

// 🔹 GET - Retrieve a specific campaign by ID
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Campaign ID is required" },
        { status: 400 }
      );
    }
    
    const campaign = await prisma.smsCampaign.findUnique({
      where: { id },
      include: {
        logs: {
          orderBy: { timestamp: 'desc' },
          take: 100
        }
      }
    });
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: "Campaign not found" },
        { status: 404 }
      );
    }
    
    const recipientCount = campaign.recipients ? campaign.recipients.split(',').length : 0;
    
    const responseData = {
      id: campaign.id,
      title: campaign.title,
      message: campaign.message,
      recipients: campaign.recipients,
      recipientCount,
      recipientType: campaign.recipientType || 'all',
      recipientTypeLabel: getRecipientTypeLabel(campaign.recipientType || 'all'),
      status: campaign.status,
      sentAt: campaign.sentAt,
      sentCount: campaign.sentCount,
      failedCount: campaign.failedCount,
      lowCreditSaved: campaign.lowCreditSaved || false,
      logs: campaign.logs,
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt,
      successRate: campaign.sentCount && recipientCount > 0 
        ? Math.round((campaign.sentCount / recipientCount) * 100)
        : 0,
      senderInfo: {
        shortcode: CELCOM_SHORTCODE,
        provider: "Celcom Africa"
      }
    };
    
    return NextResponse.json({
      success: true,
      campaign: responseData
    });
    
  } catch (error) {
    console.error("GET [id] Error:", error);
    
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve campaign" },
      { status: 500 }
    );
  }
}

// 🔹 PUT - Update an existing campaign
export async function PUT(req, { params }) {
  try {
    const auth = authenticateRequest(req);
    if (!auth.authenticated) {
      return auth.response;
    }

    console.log("✏️ PUT /api/sms/[id] - Updating SMS campaign");
    console.log(`Request from: ${auth.user.name} (${auth.user.role})`);

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Campaign ID is required" },
        { status: 400 }
      );
    }
    
    const data = await req.json();
    const { title, message, recipients, recipientType, status } = data;
    
    const existingCampaign = await prisma.smsCampaign.findUnique({
      where: { id }
    });
    
    if (!existingCampaign) {
      return NextResponse.json(
        { success: false, error: "Campaign not found" },
        { status: 404 }
      );
    }
    
    // Don't allow updating sent campaigns
    if (existingCampaign.status === 'sent' && status !== 'sent') {
      return NextResponse.json(
        { 
          success: false, 
          error: "Cannot modify a campaign that has already been sent" 
        },
        { status: 400 }
      );
    }
    
    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    
    if (message !== undefined) {
      if (message.length > 1600) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Message is too long. Maximum 1600 characters allowed.",
            currentLength: message.length
          },
          { status: 400 }
        );
      }
      updateData.message = message;
    }
    
    if (recipients !== undefined) {
      const phoneList = recipients.split(",").map(r => r.trim()).filter(Boolean);
      if (phoneList.length === 0) {
        return NextResponse.json(
          { success: false, error: "At least one valid phone number is required" },
          { status: 400 }
        );
      }
      
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
      updateData.recipients = uniquePhones.join(', ');
    }
    
    if (recipientType !== undefined) updateData.recipientType = recipientType;
    if (status !== undefined) updateData.status = status;
    
    const updatedCampaign = await prisma.smsCampaign.update({
      where: { id },
      data: updateData,
    });
    
    const recipientCount = updatedCampaign.recipients ? updatedCampaign.recipients.split(',').length : 0;
    
    return NextResponse.json({
      success: true,
      campaign: {
        id: updatedCampaign.id,
        title: updatedCampaign.title,
        message: updatedCampaign.message,
        recipients: updatedCampaign.recipients,
        recipientCount,
        recipientType: updatedCampaign.recipientType || 'all',
        recipientTypeLabel: getRecipientTypeLabel(updatedCampaign.recipientType || 'all'),
        status: updatedCampaign.status,
        sentAt: updatedCampaign.sentAt,
        sentCount: updatedCampaign.sentCount,
        failedCount: updatedCampaign.failedCount,
        lowCreditSaved: updatedCampaign.lowCreditSaved || false,
        createdAt: updatedCampaign.createdAt,
        updatedAt: updatedCampaign.updatedAt
      },
      message: 'Campaign updated successfully'
    });
    
  } catch (error) {
    console.error("PUT Error:", error);
    
    let statusCode = 500;
    let errorMessage = error.message || "Failed to update campaign";
    
    if (error.code === 'P2000') {
      statusCode = 400;
      errorMessage = "Data too long for database column";
    } else if (error.code === 'P2025') {
      statusCode = 404;
      errorMessage = "Campaign not found";
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    );
  }
}

// 🔹 DELETE - Delete a campaign
export async function DELETE(req, { params }) {
  try {
    const auth = authenticateRequest(req);
    if (!auth.authenticated) {
      return auth.response;
    }

    console.log("🗑️ DELETE /api/sms/[id] - Deleting SMS campaign");
    console.log(`Request from: ${auth.user.name} (${auth.user.role})`);

    const { id } = await params;
    
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
    
    // Optional: Warn if deleting a sent campaign
    if (campaign.status === 'sent') {
      console.log(`⚠️ Deleting sent campaign: ${id}`);
    }
    
    await prisma.smsCampaign.delete({
      where: { id },
    });
    
    return NextResponse.json({
      success: true,
      message: campaign.status === 'sent' 
        ? 'Sent campaign deleted successfully' 
        : 'Campaign deleted successfully',
    });
    
  } catch (error) {
    console.error("DELETE Error:", error);
    
    let statusCode = 500;
    let errorMessage = error.message || "Failed to delete campaign";
    
    if (error.code === 'P2025') {
      statusCode = 404;
      errorMessage = "Campaign not found";
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    );
  }
}

// 🔹 PATCH - Send campaign with low credit handling
export async function PATCH(req, { params }) {
  try {
    const auth = authenticateRequest(req);
    if (!auth.authenticated) {
      return auth.response;
    }

    console.log("📝 PATCH /api/sms/[id] - Sending SMS campaign via Celcom Africa");
    console.log(`Request from: ${auth.user.name} (${auth.user.role})`);
    console.log(`Using shortcode: "${CELCOM_SHORTCODE}"`);

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Campaign ID is required" },
        { status: 400 }
      );
    }
    
    const data = await req.json();
    const { status } = data;
    
    const existingCampaign = await prisma.smsCampaign.findUnique({
      where: { id }
    });
    
    if (!existingCampaign) {
      return NextResponse.json(
        { success: false, error: "Campaign not found" },
        { status: 404 }
      );
    }
    
    // If just updating status (not sending)
    if (status !== 'sent') {
      const updatedCampaign = await prisma.smsCampaign.update({
        where: { id },
        data: { status },
      });
      
      return NextResponse.json({
        success: true,
        campaign: updatedCampaign,
        message: `Campaign status updated to ${status}`
      });
    }
    
    // Handle sending the campaign
    if (status === 'sent' && existingCampaign.status !== 'sent') {
      // Check balance first
      const balanceInfo = await checkCelcomBalance();
      
      if (!balanceInfo.canSend) {
        // Auto-save as draft with low credit flag
        const updatedCampaign = await prisma.smsCampaign.update({
          where: { id },
          data: {
            status: 'draft',
            lowCreditSaved: true,
          }
        });
        
        return NextResponse.json({
          success: false,
          error: "INSUFFICIENT_CREDIT",
          message: `Cannot send SMS. Current balance: ${balanceInfo.balance} credits. At least 1 credit required per message. Campaign saved as draft.`,
          balance: balanceInfo.balance,
          requiredCredit: 1,
          autoSavedAsDraft: true,
          campaign: updatedCampaign
        }, { status: 402 });
      }
      
      const recipients = existingCampaign.recipients.split(",").map(r => r.trim());
      const message = existingCampaign.message;
      
      const { valid: validPhones, invalid } = validatePhoneNumbers(recipients);
      
      if (invalid.length > 0) {
        console.warn(`⚠️ Found ${invalid.length} invalid phone numbers:`, invalid);
      }
      
      if (validPhones.length === 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: "No valid phone numbers found for this campaign",
            invalidNumbers: invalid 
          },
          { status: 400 }
        );
      }
      
      console.log(`📱 Sending SMS to ${validPhones.length} valid recipients via Celcom Africa (${invalid.length} invalid skipped)`);
      
      // Send via Celcom Africa with low credit detection
      const { sent, failed, lowCreditDetected, currentBalance, requiredCredit } = 
        await sendCelcomSms(existingCampaign.id, validPhones, message);
      
      // Add invalid numbers to failed list
      invalid.forEach(phone => {
        failed.push({
          campaignId: existingCampaign.id,
          phoneNumber: phone,
          message,
          providerMessageId: null,
          status: "failed",
          errorMessage: "Invalid phone number format",
        });
      });
      
      // Save logs
      if (sent.length > 0) {
        await prisma.smsLog.createMany({ data: sent });
      }
      if (failed.length > 0) {
        await prisma.smsLog.createMany({ data: failed });
      }
      
      // Handle low credit during sending
      if (lowCreditDetected) {
        const updatedCampaign = await prisma.smsCampaign.update({
          where: { id },
          data: {
            status: 'draft',
            lowCreditSaved: true,
            sentCount: sent.length,
            failedCount: failed.length,
          }
        });
        
        const summary = {
          total: validPhones.length,
          successful: sent.length,
          failed: failed.length,
          invalidSkipped: invalid.length,
          successRate: validPhones.length > 0 ? Math.round((sent.length / validPhones.length) * 100) : 0,
        };
        
        return NextResponse.json({
          success: false,
          error: "INSUFFICIENT_CREDIT",
          message: `Sending interrupted due to low credit. Current balance: ${currentBalance}, Required: ${requiredCredit} per message. Campaign saved as draft.`,
          balance: currentBalance,
          requiredCredit,
          autoSavedAsDraft: true,
          campaign: updatedCampaign,
          smsResults: {
            sent: sent.slice(0, 10),
            failed: failed.slice(0, 10),
            summary,
            invalidNumbers: invalid.length > 0 ? invalid : undefined
          }
        }, { status: 402 });
      }
      
      // All good - update as sent
      const updatedCampaign = await prisma.smsCampaign.update({
        where: { id },
        data: {
          status: "sent",
          sentAt: new Date(),
          sentCount: sent.length,
          failedCount: failed.length,
          lowCreditSaved: false,
        },
      });
      
      const summary = {
        total: validPhones.length,
        successful: sent.length,
        failed: failed.length,
        invalidSkipped: invalid.length,
        successRate: validPhones.length > 0 ? Math.round((sent.length / validPhones.length) * 100) : 0,
      };
      
      console.log(`📊 SMS Campaign Summary:`, summary);
      
      return NextResponse.json({
        success: true,
        campaign: updatedCampaign,
        smsResults: {
          sent: sent.slice(0, 10),
          failed: failed.slice(0, 10),
          summary,
          invalidNumbers: invalid.length > 0 ? invalid : undefined
        },
        message: `Campaign sent to ${sent.length} recipients successfully via Celcom Africa${invalid.length > 0 ? ` (${invalid.length} invalid numbers skipped)` : ''}`
      });
    }
    
  } catch (error) {
    console.error("PATCH Error:", error);
    
    let statusCode = 500;
    let errorMessage = error.message || "Failed to update campaign";
    
    if (error.code === 'P2025') {
      statusCode = 404;
      errorMessage = "Campaign not found";
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: statusCode }
    );
  }
}