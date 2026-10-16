import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function NewPO() {
  const [number, setNumber] = useState('')
  const [vendorId, setVendorId] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [vendors, setVendors] = useState<any[]>([])
  const [lines, setLines] = useState<any[]>([{ productId: '', quantity: 1, unitPriceCents: 0 }])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts)
    fetch('/api/vendors').then(r => r.json()).then(setVendors)
  }, [])

  function updateLine(idx: number, patch: any) {
    const copy = [...lines]
    copy[idx] = { ...copy[idx], ...patch }
    setLines(copy)
  }

  function addLine() {
    setLines([...lines, { productId: '', quantity: 1, unitPriceCents: 0 }])
  }

  async function submit(e: any) {
    e.preventDefault()
    await fetch('/api/purchase-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, vendorId, lines }),
    })
    router.push('/purchase-orders')
  }

  return (
    <Layout>
      <div className="p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">New Purchase Order</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">PO Number</label>
            <input value={number} onChange={(e) => setNumber(e.target.value)} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Vendor</label>
            <select value={vendorId} onChange={(e) => setVendorId(e.target.value)} className="mt-1 block w-full border rounded p-2">
              <option value="">Select vendor</option>
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Lines</label>
            <div className="space-y-2">
              {lines.map((ln, idx) => (
                <div key={idx} className="p-2 border rounded grid grid-cols-4 gap-2 items-center">
                  <select value={ln.productId} onChange={(e) => {
                    const prod = products.find(p => p.id === e.target.value)
                    updateLine(idx, { productId: e.target.value, unitPriceCents: prod ? prod.priceCents : 0 })
                  }} className="col-span-2 border p-2 rounded">
                    <option value="">Select product</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <input type="number" value={ln.quantity} onChange={(e) => updateLine(idx, { quantity: Number(e.target.value) })} className="p-2 border rounded" />
                  <input type="number" value={(ln.unitPriceCents/100).toFixed(2)} onChange={(e) => updateLine(idx, { unitPriceCents: Math.round(parseFloat(e.target.value) * 100) })} className="p-2 border rounded" />
                </div>
              ))}
            </div>
            <div className="mt-2"><button type="button" onClick={addLine} className="px-3 py-1 bg-gray-200 rounded">Add line</button></div>
          </div>

          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Create PO</button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
