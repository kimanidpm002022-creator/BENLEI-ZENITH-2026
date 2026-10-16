import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../../components/Layout'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function PurchaseOrdersPage() {
  const { data: pos, error } = useSWR('/api/purchase-orders', fetcher)

  if (error) return <Layout><div>Failed to load</div></Layout>
  if (!pos) return <Layout><div>Loading...</div></Layout>

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Purchase Orders</h1>
          <Link href="/purchase-orders/new"><a className="px-4 py-2 bg-blue-600 text-white rounded">New PO</a></Link>
        </div>

        <div className="grid gap-4">
          {pos.map((po: any) => (
            <div key={po.id} className="p-4 bg-white shadow rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{po.number}</div>
                  <div className="text-sm text-gray-500">Vendor: {po.vendor?.name}</div>
                </div>
                <div className="font-bold">{(po.totalCents/100).toFixed(2)} {po.currency}</div>
              </div>
              <div className="mt-2 text-sm">
                {po.lines?.map((l: any) => (
                  <div key={l.id}>{l.quantity} x {l.product?.name} @ {(l.unitPriceCents/100).toFixed(2)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
