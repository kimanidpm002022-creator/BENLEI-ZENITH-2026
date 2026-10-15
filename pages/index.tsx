import AppShell from '../components/AppShell'

export default function HomePage() {
  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Total sales', value: '$488K', trend: '+18.4%' },
            { label: 'Procurement spend', value: '$213K', trend: '+9.1%' },
            { label: 'Outstanding invoices', value: '$76K', trend: '-4.2%' },
            { label: 'Inventory value', value: '$1.3M', trend: '+6.3%' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">{item.label}</div>
              <div className="mt-3 flex items-end justify-between">
                <div className="text-3xl font-bold text-slate-900">{item.value}</div>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
