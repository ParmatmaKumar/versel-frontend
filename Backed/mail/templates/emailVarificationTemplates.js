export function otpTemplate(otp, name, email) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #6C63FF; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Verify Your Email</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                Hi <strong>${name}</strong>,
              </p>
              
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                Thank you for registering with us. To complete your verification, please use the One-Time Password (OTP) below:
              </p>
              
              <!-- OTP Box -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 30px; margin: 30px 0; text-align: center;">
                <p style="color: #ffffff; font-size: 14px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
                <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; display: inline-block;">
                  <span style="font-size: 36px; font-weight: bold; color: #6C63FF; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
                </div>
              </div>
              
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                This code will expire in <strong>10 minutes</strong>. Please do not share this code with anyone.
              </p>
              
              <p style="font-size: 14px; color: #666666; margin: 20px 0;">
                Email: <strong>${email}</strong>
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 12px; color: #999999; margin: 0;">
                This is an automated message. Please do not reply to this email.<br>
                © 2025 Your Company. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}