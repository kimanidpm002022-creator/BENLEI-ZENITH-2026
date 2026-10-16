import prismaClient from '../lib/prisma'

async function main() {
  const prisma = prismaClient

  // Create admin user if not exists
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    const user = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin',
        role: 'ADMIN',
      },
    })
    console.log('Created admin user:', user.email)
  } else {
    console.log('Admin user already exists:', existing.email)
  }

  // Sample products
  const products = [
    { name: 'Demo Product A', sku: 'PROD-A', priceCents: 999, currency: 'USD' },
    { name: 'Demo Product B', sku: 'PROD-B', priceCents: 499, currency: 'USD' },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: p,
    })
  }

  // Sample vendors
  const vendors = [
    { name: 'Demo Vendor 1', email: 'vendor1@example.com', phone: '555-0100' },
    { name: 'Demo Vendor 2', email: 'vendor2@example.com', phone: '555-0101' },
  ]

  for (const v of vendors) {
    await prisma.vendor.upsert({
      where: { name: v.name },
      update: {},
      create: v,
    })
  }

  // Sample customers
  const customers = [
    { name: 'Demo Customer A', email: 'custA@example.com', phone: '555-0200' },
    { name: 'Demo Customer B', email: 'custB@example.com', phone: '555-0201' },
  ]

  for (const c of customers) {
    await prisma.customer.upsert({
      where: { name: c.name },
      update: {},
      create: c,
    })
  }

  // Create a sample Purchase Order with one line
  const vendor = await prisma.vendor.findFirst({ where: { name: 'Demo Vendor 1' } })
  const productA = await prisma.product.findFirst({ where: { sku: 'PROD-A' } })
  if (vendor && productA) {
    const poNumber = 'PO-001'
    const existingPo = await prisma.purchaseOrder.findUnique({ where: { number: poNumber } })
    if (!existingPo) {
      const po = await prisma.purchaseOrder.create({
        data: {
          number: poNumber,
          vendorId: vendor.id,
          status: 'CONFIRMED',
          currency: 'USD',
          totalCents: productA.priceCents,
          lines: {
            create: [
              {
                productId: productA.id,
                description: productA.name,
                quantity: 1,
                unitPriceCents: productA.priceCents,
                lineTotalCents: productA.priceCents,
              },
            ],
          },
        },
      })
      console.log('Created sample PO:', po.number)
    }
  }

  // Create a sample Sales Order with one line
  const customer = await prisma.customer.findFirst({ where: { name: 'Demo Customer A' } })
  const productB = await prisma.product.findFirst({ where: { sku: 'PROD-B' } })
  if (customer && productB) {
    const soNumber = 'SO-001'
    const existingSo = await prisma.salesOrder.findUnique({ where: { number: soNumber } })
    if (!existingSo) {
      const so = await prisma.salesOrder.create({
        data: {
          number: soNumber,
          customerId: customer.id,
          status: 'CONFIRMED',
          currency: 'USD',
          totalCents: productB.priceCents,
          lines: {
            create: [
              {
                productId: productB.id,
                description: productB.name,
                quantity: 1,
                unitPriceCents: productB.priceCents,
                lineTotalCents: productB.priceCents,
              },
            ],
          },
        },
      })
      console.log('Created sample SO:', so.number)
    }
  }

  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prismaClient.$disconnect())
