import AppShell from '../components/AppShell'

const balances = [
  { label: 'Cash', amount: '$214K', type: 'asset' },
  { label: 'Accounts receivable', amount: '$76K', type: 'asset' },
  { label: 'Accounts payable', amount: '$44K', type: 'liability' },
  { label: 'Sales revenue', amount: '$488K', type: 'income' },
  { label: 'Cost of goods sold', amount: '$196K', type: 'expense' },
  { label: 'Net profit', amount: '$94K', type: 'profit' },
]

export default function ReportsPage() {
  return (
    <AppShell title="Reports">
      <div className="grid gap-6 md:grid-cols-3">
        {balances.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">{item.amount}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{item.type}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Trial balance</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">Account</th>
                <th className="px-5 py-3 font-medium">Debit</th>
                <th className="px-5 py-3 font-medium">Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-5 py-3 text-slate-700">Cash</td>
                <td className="px-5 py-3 text-slate-700">$214,000</td>
                <td className="px-5 py-3 text-slate-700">-</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-5 py-3 text-slate-700">Accounts receivable</td>
                <td className="px-5 py-3 text-slate-700">$76,000</td>
                <td className="px-5 py-3 text-slate-700">-</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-5 py-3 text-slate-700">Sales revenue</td>
                <td className="px-5 py-3 text-slate-700">-</td>
                <td className="px-5 py-3 text-slate-700">$488,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  )
}
