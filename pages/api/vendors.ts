import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    const vendors = await prisma.vendor.findMany({ orderBy: { createdAt: 'desc' } })
    return res.status(200).json(vendors)
  }

  if (req.method === 'POST') {
    if (!session) return res.status(401).json({ error: 'Unauthorized' })
    const role = (session.user as any).role || 'USER'
    if (!['ADMIN', 'PURCHASER'].includes(role)) return res.status(403).json({ error: 'Forbidden' })

    const { name, email, phone } = req.body
    if (!name) return res.status(400).json({ error: 'Missing name' })

    const vendor = await prisma.vendor.create({ data: { name, email, phone } })
    return res.status(201).json(vendor)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
