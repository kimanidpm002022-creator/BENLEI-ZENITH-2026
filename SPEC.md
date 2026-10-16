# Procurement, Sales & Accounting Specification

This file outlines the initial product specification and data model for the procurement, sales and accounting-focused application.

Roles
- admin: full access
- purchaser: creates purchase orders, records receipts
- salesperson: creates sales orders, manages invoices
- accountant: posts payments and journal entries, runs reports

Core entities
- Product: catalog items tracked in inventory
- Vendor: supplier for procurement
- Customer: buyer for sales
- PurchaseOrder / PurchaseOrderLine: POs sent to vendors
- SalesOrder / SalesOrderLine: orders received from customers
- Invoice / InvoiceLine: invoices for sales or vendor bills
- AccountingAccount: chart of accounts
- JournalEntry / JournalEntryLine: double-entry accounting
- InventoryTransaction: receipts, shipments, adjustments

Workflows
1. Procurement
   - Purchaser creates a Purchase Order (PO) to a Vendor
   - On receipt of goods, create InventoryTransaction (receipt) and mark PO lines as received
   - Vendor sends a bill (Vendor Invoice) — create Invoice tied to PO
   - Accountant records payment and creates journal entries

2. Sales
   - Salesperson creates Sales Order (SO)
   - On shipment, create InventoryTransaction (shipment) and mark SO lines fulfilled
   - Generate Invoice from SO, record customer payment, and create journal entries

3. Accounting
   - Chart of accounts seeded with basic accounts (Cash, Bank, AR, AP, Sales, COGS, Inventory)
   - Every payment and invoice posts appropriate JournalEntry lines (double-entry)
   - Basic reports: Trial Balance, Balance Sheet, Profit & Loss, Aged Receivables/Payables

API endpoints (examples)
- GET /api/products
- GET /api/products/:id
- POST /api/purchase-orders
- GET /api/purchase-orders/:id
- POST /api/sales-orders
- POST /api/invoices (create invoice from SO or PO)
- POST /api/payments (apply payment to invoice)
- GET /api/reports/trial-balance?date=YYYY-MM-DD

Data import
- CSV/XLSX import for products, vendors, customers, and opening balances

Security
- Role-based access control (RBAC)
- Audit fields on key records (createdBy, updatedBy, timestamps)
