import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <Link href="/"><a className="font-bold">UzaPoint Clone</a></Link>
          <nav className="space-x-4">
            <Link href="/products"><a className="text-gray-600">Products</a></Link>
            <Link href="/vendors"><a className="text-gray-600">Vendors</a></Link>
            <Link href="/purchase-orders"><a className="text-gray-600">Purchase Orders</a></Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6">{children}</main>
    </div>
  )
}
