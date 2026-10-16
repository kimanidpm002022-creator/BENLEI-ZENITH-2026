import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../../components/Layout'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ProductsPage() {
  const { data: products, error } = useSWR('/api/products', fetcher)

  if (error) return <Layout><div>Failed to load</div></Layout>
  if (!products) return <Layout><div>Loading...</div></Layout>

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link href="/products/new"><a className="px-4 py-2 bg-blue-600 text-white rounded">New</a></Link>
        </div>

        <div className="grid gap-4">
          {products.map((p: any) => (
            <div key={p.id} className="p-4 bg-white shadow rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.sku}</div>
                </div>
                <div className="font-bold">{(p.priceCents/100).toFixed(2)} {p.currency}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
