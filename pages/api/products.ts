import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(products)
  }

  if (req.method === 'POST') {
    if (!session) return res.status(401).json({ error: 'Unauthorized' })
    // only allow users with ADMIN or purchaser role to create products
    const role = (session.user as any).role || 'USER'
    if (!['ADMIN', 'PURCHASER'].includes(role)) return res.status(403).json({ error: 'Forbidden' })

    const { name, sku, description, priceCents, currency } = req.body
    if (!name) return res.status(400).json({ error: 'Missing name' })

    const product = await prisma.product.create({
      data: { name, sku, description, priceCents: priceCents || 0, currency: currency || 'USD' },
    })
    return res.status(201).json(product)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
