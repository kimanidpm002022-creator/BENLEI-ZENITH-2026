# UzaPoint Clone

Starter Next.js + TypeScript + Tailwind project scaffolded by Copilot.

Getting started

1. Install dependencies:

   npm install

2. Create a .env file (see .env.example) with your DATABASE_URL and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY etc.

3. Run the dev server:

   npm run dev

Seeding (uses Prisma)

1. Set DATABASE_URL in .env
2. Run: npx prisma migrate dev --name init
3. Seed: npm run seed

