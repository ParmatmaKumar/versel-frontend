exports.couseEnrollmentEmail = (name, courseName) => {
    return `
    
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Enrollment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #4CAF50; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Enrollment Confirmed!</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                Hi <strong>${name}</strong>,
              </p>
              
              <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">
                Congratulations! You've successfully enrolled in:
              </p>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0;">
                <h2 style="color: #4CAF50; margin: 0; font-size: 22px;">${courseName}</h2>
              </div>
              
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                You're all set to begin your learning journey. We're excited to have you on board!
              </p>
              
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                You will receive further details about course materials, schedules, and access instructions in a separate email shortly.
              </p>
              
              
              
              <p style="font-size: 14px; color: #666666; margin: 20px 0 0;">
                If you have any questions, please don't hesitate to reach out to our support team.
              </p>
              
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 12px; color: #999999; margin: 0;">
                This email was sent to confirm your course enrollment.<br>
                © 2025 Your Institution. All rights reserved.
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


