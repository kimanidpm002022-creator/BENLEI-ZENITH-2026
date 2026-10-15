import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
  await prisma.product.createMany({
    data: [
      {
        name: 'Premium Plan',
        shortDesc: 'Full features: A, B, C, and support.',
        longDesc: 'Full features with priority support',
        price: 9.99,
        currency: 'USD',
        sku: 'PLAN-PREM',
        stock: 100,
        image: 'premium.jpg',
      },
      {
        name: 'Basic Plan',
        shortDesc: 'Starter plan',
        price: 4.99,
        currency: 'USD',
        sku: 'PLAN-BASIC',
        stock: 500,
        image: 'basic.jpg'
      }
    ],
    skipDuplicates: true
  })

  await prisma.user.createMany({
    data: [
      { name: 'John Doe', email: 'john@example.com', role: 'customer' },
      { name: 'Admin User', email: 'admin@example.com', role: 'admin' }
    ],
    skipDuplicates: true
  })

  console.log('Seeding complete')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
