import type { ReactNode } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/products', label: 'Products' },
  { href: '/vendors', label: 'Vendors' },
  { href: '/orders', label: 'Orders' },
  { href: '/invoices', label: 'Invoices' },
  { href: '/reports', label: 'Reports' },
]

export default function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-slate-900 text-slate-100 lg:flex">
          <div className="flex items-center gap-3 border-b border-slate-700 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 font-bold text-slate-900">L</div>
            <div>
              <div className="text-lg font-bold">Leisen</div>
              <div className="text-xs text-slate-400">Business Suite</div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-700 p-4">
            <div className="rounded-xl bg-slate-800 p-3 text-sm text-slate-300">South East Logistics</div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Operations</div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">Export</button>
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">New record</button>
              </div>
            </div>
          </header>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
