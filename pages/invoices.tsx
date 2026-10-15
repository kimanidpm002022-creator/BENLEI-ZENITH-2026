export default function InvoicesPage() {
  const invoices = [
    { number: 'INV-3008', customer: 'Northstar Foods', status: 'Issued', amount: '$22,100', due: '14 days' },
    { number: 'INV-3010', customer: 'Apex Studio', status: 'Paid', amount: '$8,420', due: 'Paid' },
    { number: 'INV-3013', customer: 'Lattice Logistics', status: 'Pending', amount: '$13,670', due: '5 days' },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 className="text-xl font-bold text-slate-900">Invoice ledger</h2>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">Create invoice</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Due</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.number} className="border-t border-slate-200">
                <td className="px-5 py-3 font-medium text-slate-900">{invoice.number}</td>
                <td className="px-5 py-3 text-slate-700">{invoice.customer}</td>
                <td className="px-5 py-3"><span className={`rounded-full px-2 py-1 text-xs font-medium ${invoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : invoice.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-cyan-100 text-cyan-700'}`}>{invoice.status}</span></td>
                <td className="px-5 py-3 text-slate-700">{invoice.amount}</td>
                <td className="px-5 py-3 text-slate-600">{invoice.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
