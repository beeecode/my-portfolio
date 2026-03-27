import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import validator from 'validator';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());

// ─── CORS ────────────────────────────────────────────────────────────────
// In production, replace 'http://localhost:3000' with your real domain,
// e.g. 'https://abdulhameed-sherif.vercel.app'
const ALLOWED_ORIGIN = process.env.APP_URL || 'http://localhost:3000';
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['POST'],
  })
);

// ─── Rate Limiting ───────────────────────────────────────────────────────
// Max 5 contact form submissions per IP every 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please try again in 15 minutes.' },
});

// ─── Email Transporter (Gmail + App Password) ───────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── POST /api/contact ──────────────────────────────────────────────────
app.post('/api/contact', contactLimiter, async (req, res) => {
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
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
