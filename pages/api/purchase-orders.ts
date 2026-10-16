import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    const pos = await prisma.purchaseOrder.findMany({
      orderBy: { createdAt: 'desc' },
      include: { vendor: true, lines: { include: { product: true } } },
    })
    return res.status(200).json(pos)
  }

  if (req.method === 'POST') {
    if (!session) return res.status(401).json({ error: 'Unauthorized' })
    const role = (session.user as any).role || 'USER'
    if (!['ADMIN', 'PURCHASER'].includes(role)) return res.status(403).json({ error: 'Forbidden' })

    const { number, vendorId, currency, lines } = req.body
    if (!number || !vendorId || !Array.isArray(lines) || lines.length === 0)
      return res.status(400).json({ error: 'Missing fields' })

    const totalCents = lines.reduce((s: number, l: any) => s + (l.quantity || 0) * (l.unitPriceCents || 0), 0)

    const po = await prisma.purchaseOrder.create({
      data: {
        number,
        vendorId,
        currency: currency || 'USD',
        totalCents,
        status: 'CONFIRMED',
        lines: {
          create: lines.map((l: any) => ({
            productId: l.productId,
            description: l.description,
            quantity: l.quantity || 1,
            unitPriceCents: l.unitPriceCents || 0,
            lineTotalCents: (l.quantity || 1) * (l.unitPriceCents || 0),
          })),
        },
      },
      include: { vendor: true, lines: { include: { product: true } } },
    })

    return res.status(201).json(po)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
