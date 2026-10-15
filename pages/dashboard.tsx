export default function DashboardPage() {
  const stats = [
    { label: 'Total sales', value: '$488K', trend: '+18.4%' },
    { label: 'Procurement spend', value: '$213K', trend: '+9.1%' },
    { label: 'Outstanding invoices', value: '$76K', trend: '-4.2%' },
    { label: 'Inventory value', value: '$1.3M', trend: '+6.3%' },
  ]

  const revenue = [42, 58, 50, 72, 68, 80, 96]

  const activity = [
    { title: 'PO-1042 awaiting approval', detail: 'Acme Supplies • 2 hours ago', tone: 'bg-amber-400' },
    { title: 'Invoice INV-3008 issued', detail: 'Northstar Foods • 4 hours ago', tone: 'bg-cyan-400' },
    { title: 'SO-2204 shipped', detail: 'Lattice Logistics • 1 day ago', tone: 'bg-emerald-400' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className="mt-3 flex items-end justify-between">
              <div className="text-3xl font-bold text-slate-900">{item.value}</div>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Revenue overview</h2>
            <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">This quarter</button>
          </div>

          <div className="flex h-52 items-end gap-3">
            {revenue.map((height, idx) => (
              <div key={idx} className="flex-1 rounded-t-2xl bg-gradient-to-t from-cyan-500 via-cyan-400 to-emerald-400" style={{ height: `${height}%` }} />
            ))}
          </div>

          <div className="mt-4 flex justify-between text-xs text-slate-500">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Recent activity</h2>
          <div className="mt-5 space-y-4">
            {activity.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                <span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.tone}`} />
                <div>
                  <div className="font-medium text-slate-800">{item.title}</div>
                  <div className="text-sm text-slate-500">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Sales pipeline</h2>
          <div className="mt-5 space-y-4">
            {[{name:'Qualified leads',value:128,pct:68},{name:'Quotations sent',value:54,pct:74},{name:'Orders won',value:22,pct:86},{name:'Payments collected',value:18,pct:91}].map((field) => (
              <div key={field.name}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                  <span>{field.name}</span>
                  <span>{field.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${field.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Cashflow summary</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Receivables</div><div className="mt-2 text-2xl font-bold text-slate-900">$76K</div></div>
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Payables</div><div className="mt-2 text-2xl font-bold text-slate-900">$44K</div></div>
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-sm text-slate-500">Net cash</div><div className="mt-2 text-2xl font-bold text-slate-900">$32K</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
