const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendVerificationEmail(toEmail, token) {
  const verifyUrl = `${process.env.APP_BASE_URL}/api/auth/verify/${token}`;
  const mailOptions = {
    from: `"Fishmate Assistant" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Verify your Fishmate account',
    html: `
      <p>Thank you for registering at Fishmate Assistant.</p>
      <p>Click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>If you didn't request this, ignore this email.</p>
    `
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
