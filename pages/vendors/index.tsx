import useSWR from 'swr'
import Link from 'next/link'
import Layout from '../../components/Layout'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function VendorsPage() {
  const { data: vendors, error } = useSWR('/api/vendors', fetcher)

  if (error) return <Layout><div>Failed to load</div></Layout>
  if (!vendors) return <Layout><div>Loading...</div></Layout>

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Vendors</h1>
          <Link href="/vendors/new"><a className="px-4 py-2 bg-blue-600 text-white rounded">New</a></Link>
        </div>

        <div className="grid gap-4">
          {vendors.map((v: any) => (
            <div key={v.id} className="p-4 bg-white shadow rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{v.name}</div>
                  <div className="text-sm text-gray-500">{v.email}</div>
                </div>
                <div className="text-sm text-gray-500">{v.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
