import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    const sos = await prisma.salesOrder.findMany({
      orderBy: { createdAt: 'desc' },
      include: { customer: true, lines: { include: { product: true } } },
    })
    return res.status(200).json(sos)
  }

  if (req.method === 'POST') {
    if (!session) return res.status(401).json({ error: 'Unauthorized' })
    const role = (session.user as any).role || 'USER'
    if (!['ADMIN', 'SALESPERSON'].includes(role)) return res.status(403).json({ error: 'Forbidden' })

    const { number, customerId, currency, lines } = req.body
    if (!number || !customerId || !Array.isArray(lines) || lines.length === 0)
      return res.status(400).json({ error: 'Missing fields' })

    const totalCents = lines.reduce((s: number, l: any) => s + (l.quantity || 0) * (l.unitPriceCents || 0), 0)

    const so = await prisma.salesOrder.create({
      data: {
        number,
        customerId,
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
      include: { customer: true, lines: { include: { product: true } } },
    })

    return res.status(201).json(so)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
