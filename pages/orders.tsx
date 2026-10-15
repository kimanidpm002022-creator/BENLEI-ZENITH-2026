export default function OrdersPage() {
  const orders = [
    { number: 'PO-1042', type: 'Purchase Order', counterparty: 'Acme Supplies', status: 'Awaiting approval', total: '$12,400' },
    { number: 'SO-2204', type: 'Sales Order', counterparty: 'Northstar Foods', status: 'Shipped', total: '$8,940' },
    { number: 'PO-1048', type: 'Purchase Order', counterparty: 'Apex Hardware', status: 'Received', total: '$4,760' },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="text-xl font-bold text-slate-900">Orders</h2>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">Create order</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Counterparty</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.number} className="border-t border-slate-200">
                <td className="px-5 py-3 font-medium text-slate-900">{order.number}</td>
                <td className="px-5 py-3 text-slate-600">{order.type}</td>
                <td className="px-5 py-3 text-slate-700">{order.counterparty}</td>
                <td className="px-5 py-3"><span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">{order.status}</span></td>
                <td className="px-5 py-3 text-slate-700">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
