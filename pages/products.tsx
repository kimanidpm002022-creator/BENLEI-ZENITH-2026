import AppShell from '../components/AppShell'

const products = [
  { sku: 'PROD-001', name: 'Widget A', stock: 42, price: '$19.00', category: 'Hardware' },
  { sku: 'PROD-002', name: 'Widget B', stock: 18, price: '$42.00', category: 'Hardware' },
  { sku: 'PROD-003', name: 'Office Pack', stock: 69, price: '$11.50', category: 'Office' },
  { sku: 'PROD-004', name: 'Fleet Monitor', stock: 9, price: '$149.00', category: 'Tech' },
]

export default function ProductsPage() {
  return (
    <AppShell title="Products">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-xl font-bold text-slate-900">Catalog</h2>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">Add product</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">SKU</th>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.sku} className="border-t border-slate-200">
                  <td className="px-5 py-3 text-slate-700">{product.sku}</td>
                  <td className="px-5 py-3 font-medium text-slate-900">{product.name}</td>
                  <td className="px-5 py-3 text-slate-600">{product.category}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
