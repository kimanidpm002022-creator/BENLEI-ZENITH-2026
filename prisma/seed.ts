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

  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prismaClient.$disconnect())
