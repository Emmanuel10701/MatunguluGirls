import africastalking from 'africastalking';
import dotenv from 'dotenv';

dotenv.config();

// 1. Clean the credentials and log them (masked)
const username = process.env.AT_USERNAME?.trim();
const apiKey = process.env.AT_API_KEY?.trim();

console.log("\n--- Debugging Credentials ---");
console.log(`Username: [${username}]`);
console.log(`API Key:  [${apiKey?.substring(0, 8)}...]`); 

if (!username || !apiKey) {
    console.error("❌ Error: Missing credentials in .env file!");
    process.exit(1);
}

const at = africastalking({ apiKey, username });
const sms = at.SMS;

async function sendTest() {
    try {
        // Format to E.164 (+254...)
        const rawNumber = '0793472960';
        const formatted = rawNumber.replace(/\D/g, '');
        const finalNumber = '+254' + (formatted.startsWith('0') ? formatted.substring(1) : formatted);

        console.log(`\n📱 Sending to: ${finalNumber}`);

        const response = await sms.send({
            to: [finalNumber],
            message: `Matungulu Girls High Test: ${new Date().toLocaleTimeString()}`,
            // NOTE: If in sandbox, 'from' must be omitted or be a registered shortcode
            // from: '20880' 
        });

        console.log("✅ SUCCESS:", response);

    } catch (error) {
        console.error("\n❌ Failed: Request failed with status code", error.response?.status || 'Unknown');
        if (error.response?.data) {
            console.error("Details:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

sendTest();