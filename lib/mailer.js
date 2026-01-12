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
        from: `"DonateCare Security" <${process.env.EMAIL_USER}>`,
        to,
        subject: `${otp} is your DonateCare verification code`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
              <tr>
                  <td align="center">
                      <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                          
                          <tr>
                              <td style="padding: 40px 40px 20px 40px; text-align: left;">
                                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
                                      <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                                          Donate<span style="color: #2563eb;">Care</span>
                                      </h1>
                                  </div>
                                  <h2 style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 700;">Verify your identity</h2>
                                  <p style="margin: 12px 0 0 0; color: #64748b; font-size: 15px; line-height: 1.6;">
                                      Use the following security code to complete your login process. This code helps us keep your account safe.
                                  </p>
                              </td>
                          </tr>
                          
                          <tr>
                              <td style="padding: 0 40px 30px 40px;">
                                  <div style="background-color: #f1f5f9; border-radius: 12px; padding: 32px; text-align: center; border: 1px solid #e2e8f0;">
                                      <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px;">Verification Code</p>
                                      <h1 style="margin: 0; color: #2563eb; font-size: 48px; font-weight: 800; letter-spacing: 10px; font-family: 'Courier New', Courier, monospace;">${otp}</h1>
                                  </div>
                              </td>
                          </tr>

                          <tr>
                              <td style="padding: 0 40px 40px 40px;">
                                  <div style="border-top: 1px solid #f1f5f9; padding-top: 24px;">
                                      <p style="margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.6;">
                                          <strong>Security Reminder:</strong> This code is valid for 5 minutes. If you did not request this code, please ignore this email or contact support.
                                      </p>
                                  </div>
                              </td>
                          </tr>
                          
                          <tr>
                              <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                                  <p style="margin: 0 0 4px 0; color: #64748b; font-size: 12px; font-weight: 600;">
                                      © 2026 DonateCare Foundation
                                  </p>
                                  <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                                      Gujarat, India • Verified Social Impact Platform
                                  </p>
                              </td>
                          </tr>
                      </table>

                      <table width="500" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="padding: 24px 0; text-align: center;">
                                  <p style="margin: 0; color: #cbd5e1; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
                                      Making a difference, one donation at a time.
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