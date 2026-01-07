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
        subject: "Your Login OTP",
        html: `
      <h2>Your OTP</h2>
      <p><b>${otp}</b></p>
      <p>Valid for 5 minutes</p>
    `,
    });
};
