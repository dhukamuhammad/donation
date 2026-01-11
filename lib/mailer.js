import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // app password
  },
});

export const sendOTPEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"Donation App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Login OTP - Donation App",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
              <tr>
                  <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                          <!-- Header -->
                          <tr>
                              <td style="background:#155DFC; padding: 40px 30px; text-align: center;">
                                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">DonateCare</h1>
                                  <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">Making a difference together</p>
                              </td>
                          </tr>
                          
                          <!-- Content -->
                          <tr>
                              <td style="padding: 40px 30px;">
                                  <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Verify Your Login</h2>
                                  <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                      Thank you for being part of our mission to make a positive impact. Use the OTP below to securely log in to your account.
                                  </p>
                                  
                                  <!-- OTP Box -->
                                  <table width="100%" cellpadding="0" cellspacing="0">
                                      <tr>
                                          <td align="center" style="padding: 20px 0;">
                                              <div style="background: #155DFC; border-radius: 10px; padding: 25px; display: inline-block;">
                                                  <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
                                                  <h1 style="margin: 0; color: #ffffff; font-size: 42px; font-weight: 700; letter-spacing: 8px;">${otp}</h1>
                                              </div>
                                          </td>
                                      </tr>
                                  </table>
                                  
                                  <!-- Timer -->
                                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                                      <tr>
                                          <td align="center">
                                              <p style="margin: 0; color: #666666; font-size: 14px;">
                                                  ⏱️ This code will expire in <strong style="color: #667eea;">5 minutes</strong>
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                                  
                                  <!-- Security Notice -->
                                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
                                      <tr>
                                          <td style="padding: 15px;">
                                              <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5;">
                                                  🔒 <strong>Security Tip:</strong> Never share this OTP with anyone. Our team will never ask for your OTP.
                                              </p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          
                          <!-- Footer -->
                          <tr>
                              <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                                  <p style="margin: 0 0 15px 0; color: #666666; font-size: 14px;">
                                      Every donation creates hope. Thank you for your support! ❤️
                                  </p>
                                  <p style="margin: 0; color: #999999; font-size: 12px;">
                                      © 2026 DonateCare. Together we make a difference.
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `,
  });
};
export default transporter;
