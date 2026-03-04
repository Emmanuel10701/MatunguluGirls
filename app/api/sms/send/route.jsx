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
            message: 'User does not have permission to send SMS campaigns' 
          };
        }
        
      } catch (error) {
        return { valid: false, reason: 'invalid_admin_token', message: 'Invalid admin token' };
      }

      console.log('✅ SMS send authentication successful');
      
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
          message: "Authentication required to send SMS.",
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

/**
 * Validate and format phone numbers to 254XXXXXXXXX format
 */
function validatePhoneNumbers(phoneNumbers) {
  const valid = [];
  const invalid = [];
  
  // Kenyan phone numbers: 07XX XXX XXX, 2547XX XXX XXX, +2547XX XXX XXX
  const regex = /^(?:(?:\+?254)|0)?(7[0-9]{8})$/;
  
  phoneNumbers.forEach(num => {
    const cleaned = num.trim().replace(/\s+/g, '').replace(/-/g, '');
    
    const match = cleaned.match(regex);
    
    if (match) {
      // Extract the subscriber number (7XXXXXXXX)
      const subscriberNumber = match[1];
      
      // Format to international format: 254 + subscriber number
      const formatted = '254' + subscriberNumber;
      
      // Verify final length (should be 12 digits: 254 + 9 digits)
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
  
  // Celcom accepts up to 100 numbers per request
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
        // Unexpected response - mark all as failed
        console.warn("⚠️ Unexpected API response format", data);
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
    
    // If low credit detected, stop sending further batches
    if (lowCreditDetected) {
      console.log(`⚠️ Low credit detected. Stopping further batches.`);
      break;
    }
    
    // Delay between batches to avoid rate limiting
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
// API HANDLER
// ====================================================================

export async function POST(req) {
  try {
    // ==================== AUTHENTICATION ====================
    const auth = authenticateRequest(req);
    if (!auth.authenticated) {
      return auth.response;
    }
    // ==================== END AUTHENTICATION ====================

    const { campaignId } = await req.json();
    
    if (!campaignId) {
      return NextResponse.json(
        { success: false, error: "campaignId is required" },
        { status: 400 }
      );
    }

    // Get campaign
    const campaign = await prisma.smsCampaign.findUnique({
      where: { id: campaignId }
    });

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: "Campaign not found" },
        { status: 404 }
      );
    }

    if (campaign.status === "sent") {
      return NextResponse.json(
        { success: false, error: "Campaign has already been sent" },
        { status: 400 }
      );
    }

    // Check balance first
    const balanceInfo = await checkCelcomBalance();
    
    if (!balanceInfo.canSend) {
      // Update campaign as draft with low credit flag
      await prisma.smsCampaign.update({
        where: { id: campaignId },
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
        autoSavedAsDraft: true
      }, { status: 402 }); // 402 Payment Required
    }

    // Get recipients and validate
    const recipients = campaign.recipients.split(",").map(r => r.trim());
    const message = campaign.message;
    
    // Validate and format phone numbers
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

    console.log(`📱 Sending SMS to ${validPhones.length} valid recipients via Celcom Africa`);
    console.log(`📱 Using shortcode: "${CELCOM_SHORTCODE}"`);

    // Send via Celcom Africa with low credit detection
    const { sent, failed, lowCreditDetected, currentBalance, requiredCredit } = 
      await sendCelcomSms(campaign.id, validPhones, message);
    
    // Add invalid numbers to failed list
    invalid.forEach(phone => {
      failed.push({
        campaignId: campaign.id,
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
        where: { id: campaignId },
        data: {
          status: 'draft',
          lowCreditSaved: true,
          sentCount: sent.length,
          failedCount: failed.length,
        }
      });

      const summary = {
        total: recipients.length,
        validCount: validPhones.length,
        successful: sent.length,
        failed: failed.length,
        invalidSkipped: invalid.length,
        successRate: validPhones.length > 0 ? Math.round((sent.length / validPhones.length) * 100) : 0,
      };

      return NextResponse.json({
        success: false,
        error: "INSUFFICIENT_CREDIT",
        message: `Sending interrupted due to low credit. Current balance: ${currentBalance}, Required: ${requiredCredit} per message. Campaign saved as draft with partial results.`,
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

    // All good - update campaign as sent
    const updatedCampaign = await prisma.smsCampaign.update({
      where: { id: campaignId },
      data: {
        status: "sent",
        sentAt: new Date(),
        sentCount: sent.length,
        failedCount: failed.length,
        lowCreditSaved: false,
      },
    });

    const summary = {
      total: recipients.length,
      validCount: validPhones.length,
      successful: sent.length,
      failed: failed.length,
      invalidSkipped: invalid.length,
      successRate: validPhones.length > 0 ? Math.round((sent.length / validPhones.length) * 100) : 0,
    };

    return NextResponse.json({
      success: true,
      campaign: updatedCampaign,
      smsResults: { 
        sent: sent.slice(0, 10), // Return only first 10 logs to avoid huge response
        failed: failed.slice(0, 10),
        summary,
        invalidNumbers: invalid.length > 0 ? invalid : undefined
      },
      message: `Campaign sent to ${sent.length} recipients successfully via Celcom Africa${invalid.length > 0 ? ` (${invalid.length} invalid numbers skipped)` : ''}`
    });

  } catch (error) {
    console.error("POST /api/sms/send error:", error);
    
    // Try to update campaign as draft if error occurs
    try {
      const { campaignId } = await req.json();
      if (campaignId) {
        await prisma.smsCampaign.update({
          where: { id: campaignId },
          data: {
            status: 'draft',
            lowCreditSaved: true,
          }
        });
      }
    } catch (updateError) {
      console.error("Failed to update campaign after error:", updateError);
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        autoSavedAsDraft: true 
      },
      { status: 500 }
    );
  }
}