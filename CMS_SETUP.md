# Portfolio CMS setup

The admin dashboard is available at `/admin`. Portfolio content is stored in PostgreSQL and managed through Prisma.

## 1. Configure environment variables

Copy `.env.example` to `.env.local` and provide:

- `DATABASE_URL`: the PostgreSQL connection string from Neon, Supabase, Railway, or another provider.
- `ADMIN_EMAIL`: the email used to sign in.
- `ADMIN_PASSWORD`: a long, unique password.
- `AUTH_SECRET`: at least 32 random characters used to sign admin sessions.
- `EMAIL_USER` and `EMAIL_PASS`: Gmail SMTP credentials for the contact form.

Generate an authentication secret with:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 2. Create and seed the database

```powershell
npm run db:generate
npm run db:push
npm run db:seed
```

Then start the application and visit `http://localhost:3000/admin`.

## 3. Production deployment

Add the same variables to the Vercel project settings. Run `npm run db:push` against the production `DATABASE_URL` once, followed by `npm run db:seed`. The seed is safe to rerun and does not replace existing collections.

The public portfolio uses built-in fallback content if PostgreSQL is temporarily unavailable, while the admin editor requires a working database before it can save.
