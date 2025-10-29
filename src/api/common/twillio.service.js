const twilio = require("twilio");
const crypto = require('crypto');


const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function sendOtp(phoneNumber,otp) {
    console.log(`Sending OTP to ${phoneNumber}`);
  try {

    // 👉 Save OTP in DB / cache for verification
    console.log(`Generated OTP for ${phoneNumber}: ${otp}`);

    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(`OTP sent to ${phoneNumber}: ${message.sid}`);

    return { success: true, sid: message.sid, otp }; // ⚠️ don’t return otp in production
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendOtp };