import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create Chart of Accounts
  const cash = await prisma.accountingAccount.upsert({
    where: { code: '1000' },
    update: {},
    create: { code: '1000', name: 'Cash', type: 'Asset' }
  })

  const ar = await prisma.accountingAccount.upsert({
    where: { code: '1100' },
    update: {},
    create: { code: '1100', name: 'Accounts Receivable', type: 'Asset' }
  })

  const ap = await prisma.accountingAccount.upsert({
    where: { code: '2000' },
    update: {},
    create: { code: '2000', name: 'Accounts Payable', type: 'Liability' }
  })

  const salesAcc = await prisma.accountingAccount.upsert({
    where: { code: '4000' },
    update: {},
    create: { code: '4000', name: 'Sales Revenue', type: 'Income' }
  })

  const cogs = await prisma.accountingAccount.upsert({
    where: { code: '5000' },
    update: {},
    create: { code: '5000', name: 'Cost of Goods Sold', type: 'Expense' }
  })

  // Vendors & Customers
  const vendor = await prisma.vendor.upsert({
    where: { name: 'Acme Supplies' },
    update: {},
    create: { name: 'Acme Supplies', email: 'sales@acme.example.com' }
  })

  const customer = await prisma.customer.upsert({
    where: { name: 'Beta Corp' },
    update: {},
    create: { name: 'Beta Corp', email: 'acct@beta.example.com' }
  })

  // Products
  const prod1 = await prisma.product.upsert({
    where: { sku: 'PROD-001' },
    update: {},
    create: {
      sku: 'PROD-001',
      name: 'Widget A',
      description: 'Standard widget',
      unitPrice: 20.0,
      cost: 12.0,
      currency: 'USD',
      stock: 50
    }
  })

  const prod2 = await prisma.product.upsert({
    where: { sku: 'PROD-002' },
    update: {},
    create: {
      sku: 'PROD-002',
      name: 'Widget B',
      description: 'Advanced widget',
      unitPrice: 45.0,
      cost: 30.0,
      currency: 'USD',
      stock: 20
    }
  })

  // Purchase Order
  const po = await prisma.purchaseOrder.create({
    data: {
      vendorId: vendor.id,
      number: 'PO-1001',
      status: 'open',
      currency: 'USD',
      total: 360.0,
      lines: {
        create: [
          { productId: prod1.id, quantity: 10, unitPrice: 12.0 },
          { productId: prod2.id, quantity: 8, unitPrice: 30.0 }
        ]
      }
    },
    include: { lines: true }
  })

  // Sales Order
  const so = await prisma.salesOrder.create({
    data: {
      customerId: customer.id,
      number: 'SO-2001',
      status: 'confirmed',
      currency: 'USD',
      total: 130.0,
      lines: {
        create: [
          { productId: prod1.id, quantity: 2, unitPrice: 20.0 },
          { productId: prod2.id, quantity: 1, unitPrice: 45.0 }
        ]
      }
    },
    include: { lines: true }
  })

  // Invoice for sales order (customer invoice)
  const invoice = await prisma.invoice.create({
    data: {
      number: 'INV-3001',
      type: 'customer',
      referenceId: so.id,
      partyId: customer.id,
      total: so.total,
      currency: 'USD',
      status: 'issued',
      lines: {
        create: so.lines.map(l => ({ productId: l.productId, quantity: l.quantity, unitPrice: l.unitPrice }))
      }
    },
    include: { lines: true }
  })

  // Example Journal Entry: record sale (debit AR, credit Sales)
  const je = await prisma.journalEntry.create({
    data: {
      memo: `Record sale ${invoice.number}`,
      lines: {
        create: [
          { accountId: ar.id, debit: invoice.total, credit: 0 },
          { accountId: salesAcc.id, debit: 0, credit: invoice.total }
        ]
      }
    },
    include: { lines: true }
  })

  console.log('Seeding complete')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
