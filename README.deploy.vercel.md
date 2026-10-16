## Deploying BenLei Zenith 2026 to Vercel

This project is configured to run on Vercel (Next.js). Follow these steps to deploy:

1. Connect the repository
   - Go to https://vercel.com/new and pick "Import Git Repository".
   - Authorize and select the repository (after you rename it to benlei-zenith-2026 if you haven't already).

2. Build & Output settings (defaults usually work)
   - Framework Preset: Next.js
   - Build Command: npm run build
   - Output Directory: .next

3. Environment variables
   - Add the required production environment variables in the Vercel project settings > Environment Variables. Use the values from `.env.example.production` as a guide. The minimum required vars:
     - DATABASE_URL (Postgres recommended)
     - NEXTAUTH_URL (e.g. https://your-vercel-domain.vercel.app)
     - NEXTAUTH_SECRET (secure random string)
   - Optional but recommended for full functionality:
     - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM
     - GITHUB_ID, GITHUB_SECRET
     - STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

4. Database migrations & seed
   - Do NOT run seeds automatically in production unless you understand the impact. Recommended approach:
     - Deploy the app to Vercel (it will build but not run DB migrations automatically).
     - Run migrations from your local machine or CI against the production database:
       - npx prisma migrate deploy --preview-feature
     - To seed (optional): run `npm run seed` locally against the production DATABASE_URL or use a one-off admin job.

5. Webhooks & integrations
   - If you use webhooks or third-party integrations, update URLs to use the production Vercel domain.

6. Optional: Preview & Production
   - Configure the same environment variables for Preview and Production as needed in the Vercel console.

7. Verify
   - After deployment, visit the site URL and sign in. If SMTP is not configured, use a dev email magic-link or configure SMTP values in Vercel.

If you'd like, I can create a short GitHub Actions workflow to run migrations automatically on successful pushes to main. Let me know if you want automatic migrations (caution: schema changes in production require backups).
