exports.passwordUpdate = (email,name)=>{
      return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Updated</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #2196F3; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Password Updated</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                Hi <strong>${name}</strong>,
              </p>
              
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                Your password was successfully updated for the account associated with <strong>${email}</strong>.
              </p>
              
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                If you made this change, you can safely ignore this email.
              </p>
              
              <!-- Security Warning -->
              <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #856404; margin: 0 0 10px; font-size: 16px;">⚠️ Didn't make this change?</h3>
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  If you did not update your password, your account may have been compromised. Please contact our support team immediately to secure your account.
                </p>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 12px; color: #999999; margin: 0;">
                This is an automated security notification.<br>
                Please do not reply to this email.<br>
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

};