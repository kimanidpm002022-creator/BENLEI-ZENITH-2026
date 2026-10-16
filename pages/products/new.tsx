import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function NewProduct() {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('0.00')
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    const priceCents = Math.round(parseFloat(price) * 100)
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, sku, priceCents }),
    })
    router.push('/products')
  }

  return (
    <Layout>
      <div className="p-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">New Product</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">SKU</label>
            <input value={sku} onChange={(e) => setSku(e.target.value)} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
