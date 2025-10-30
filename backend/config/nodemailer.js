import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// verify SMTP config at startup (helps catch credential issues early)
transporter
  .verify()
  .then(() => console.log("SMTP transporter verified and ready to send emails"))
  .catch((err) => console.error("SMTP transporter verify failed:", err));

export default transporter;
