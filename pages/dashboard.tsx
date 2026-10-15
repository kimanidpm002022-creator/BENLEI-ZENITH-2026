import AppShell from '../components/AppShell'

const kpis = [
  { label: 'Revenue', value: '$488K', delta: '+18.4%' },
  { label: 'Purchases', value: '$213K', delta: '+9.1%' },
  { label: 'Outstanding AR', value: '$76K', delta: '-4.2%' },
  { label: 'Inventory value', value: '$1.3M', delta: '+6.3%' },
]

const activity = [
  { title: 'Purchase Order #PO-1042', meta: 'Awaiting approval • 2h ago', tone: 'amber' },
  { title: 'Invoice INV-3008 issued', meta: 'Customer: Northstar Foods • 4h ago', tone: 'cyan' },
  { title: 'Sales order SO-2204 shipped', meta: 'Fulfillment: Region 2 • 1 day ago', tone: 'emerald' },
]

const pipeline = [
  { stage: 'Qualified leads', count: 128, progress: 68 },
  { stage: 'Quotations sent', count: 54, progress: 74 },
  { stage: 'Orders won', count: 22, progress: 86 },
  { stage: 'Payments collected', count: 18, progress: 91 },
]

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className="mt-3 flex items-end justify-between">
              <div className="text-3xl font-bold text-slate-900">{item.value}</div>
              <div className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{item.delta}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Revenue overview</h2>
            <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">This quarter</button>
          </div>

          <div className="flex h-52 items-end gap-3">
            {[30, 40, 35, 56, 48, 72, 90].map((height, index) => (
              <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-cyan-500 via-cyan-400 to-emerald-400" style={{ height: `${height}%` }} />
            ))}
          </div>

          <div className="mt-4 flex justify-between text-xs text-slate-500">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Recent activity</h2>
          <div className="mt-5 space-y-4">
            {activity.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                <div className={`mt-1 h-2.5 w-2.5 rounded-full ${item.tone === 'amber' ? 'bg-amber-400' : item.tone === 'cyan' ? 'bg-cyan-400' : 'bg-emerald-400'}`} />
                <div>
                  <div className="font-medium text-slate-800">{item.title}</div>
                  <div className="text-sm text-slate-500">{item.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Sales pipeline</h2>
          <div className="mt-5 space-y-4">
            {pipeline.map((stage) => (
              <div key={stage.stage}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                  <span>{stage.stage}</span>
                  <span>{stage.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${stage.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Cashflow summary</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Receivables</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">$76K</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Payables</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">$44K</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Net cash</div>
              <div className="mt-2 text-2xl font-bold text-slate-900">$32K</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
