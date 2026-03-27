import nodemailer from 'nodemailer';
import validator from 'validator';

// ─── Email Transporter (Gmail + App Password) ───────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // --- Required fields ---
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // --- Field length limits ---
  if (name.length > 100) {
    return res.status(400).json({ error: 'Name must be 100 characters or fewer.' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message must be 2000 characters or fewer.' });
  }

  // --- Email format validation ---
  if (!validator.isEmail(email)) {
    return res.status(422).json({ error: 'Please provide a valid email address.' });
  }

  // --- Sanitize inputs ---
  const safeName = validator.escape(name.trim());
  const safeMessage = validator.escape(message.trim());
  const safeEmail = validator.normalizeEmail(email) || email;

  try {
    await transporter.sendMail({
      from: `"${safeName}" <${process.env.EMAIL_USER}>`,
      replyTo: safeEmail,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact — ${safeName}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="margin:0 0 8px;color:#111;">New message from your portfolio</h2>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;background:#f9fafb;padding:16px;border-radius:8px;">${safeMessage}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p style="font-size:12px;color:#6b7280;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email send failed:', err.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
