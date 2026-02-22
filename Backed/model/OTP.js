const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { otpTemplate } = require("../mail/templates/emailVarificationTemplates");

const OTPSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60, // OTP expires in 5 minutes
    },
});

// Function to send OTP email
async function sendVerificationEmail(email, otp) {
    try {
        const textBody = `Your verification code is ${otp}. It will expire in 5 minutes.`;
        
        // Extract name from email (before @) or use a default
        const name = email.split('@')[0];
        
        const htmlBody = otpTemplate(otp, name, email);
        
        const response = await mailSender(
            email,
            "Verification OTP from StudyNotion",
            textBody,
            htmlBody
        );
        console.log("OTP email sent successfully:", response && response.messageId ? response.messageId : response);
    } catch (error) {
        console.log("Error sending OTP email:", error);
        throw error;
    }
}

// pre-save hook
OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);