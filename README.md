# UzaPoint Clone — Procurement, Sales & Accounting Scaffold

This repository was updated to focus on procurement, sales, and accounting workflows.

What's in this update

- Prisma schema expanded with models for Vendors, Customers, Purchase Orders, Sales Orders, Invoices, Accounting accounts and Journal Entries, and Inventory transactions.
- Seed script that inserts demo vendors, customers, products, a purchase order, a sales order, an invoice, and example journal entries.
- High-level SPEC.md describing core features, data model, and planned API endpoints.

Quick start

1. Install dependencies:
   npm install

2. Copy .env.example to .env and set DATABASE_URL

3. Run Prisma migrate and seed:
   npx prisma migrate dev --name init
   npm run seed

4. Run dev server:
   npm run dev

Next steps I can take (pick one):
- Build UI pages for: Products, Vendors, Purchase Orders, Sales Orders, Invoices, Accounting (journal, chart of accounts, trial balance)
- Implement auth and role-based access (admin, purchaser, salesperson, accountant)
- Add CSV import/export and basic reports (sales by period, outstanding payables/receivables, inventory valuation)

If you'd like me to continue, tell me which features to prioritize and whether you have specific accounting rules (accrual vs cash, tax rules, local currency/multi-currency).
