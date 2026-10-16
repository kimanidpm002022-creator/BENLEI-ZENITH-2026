import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../../components/Layout'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function SalesOrdersPage() {
  const { data: sos, error } = useSWR('/api/sales-orders', fetcher)

  if (error) return <Layout><div>Failed to load</div></Layout>
  if (!sos) return <Layout><div>Loading...</div></Layout>

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Sales Orders</h1>
          <Link href="/sales-orders/new"><a className="px-4 py-2 bg-blue-600 text-white rounded">New SO</a></Link>
        </div>

        <div className="grid gap-4">
          {sos.map((so: any) => (
            <div key={so.id} className="p-4 bg-white shadow rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{so.number}</div>
                  <div className="text-sm text-gray-500">Customer: {so.customer?.name}</div>
                </div>
                <div className="font-bold">{(so.totalCents/100).toFixed(2)} {so.currency}</div>
              </div>
              <div className="mt-2 text-sm">
                {so.lines?.map((l: any) => (
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
