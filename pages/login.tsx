import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950/40 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-cyan-500 via-sky-600 to-emerald-500 p-10 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black text-white">L</div>
            <div>
              <div className="text-xl font-bold">Leisen</div>
              <div className="text-sm text-cyan-50/80">Procurement • Sales • Accounting</div>
            </div>
          </div>

          <h1 className="mt-10 text-4xl font-black leading-tight">Run your business from one platform.</h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-cyan-50/85">
            Connect procurement, orders, cash flow, and financial visibility in one place for faster, smarter decisions.
          </p>

          <div className="mt-8 space-y-3 text-sm text-white/90">
            <div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-white" /> Supplier workflows</div>
            <div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-white" /> Sales monitoring</div>
            <div className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-white" /> Financial reporting</div>
          </div>
        </div>

        <div className="bg-white p-10 text-slate-900">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Welcome back</div>
          <h2 className="mt-3 text-3xl font-black">Sign in to Leisen</h2>

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input type="email" defaultValue="admin@leisen.co" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-cyan-500 focus:bg-white" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" defaultValue="password123" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white" />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" /> Remember me</label>
              <Link href="/" className="text-cyan-700 hover:text-cyan-800">Forgot password?</Link>
            </div>

            <Link href="/dashboard" className="block rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700">
              Sign in
            </Link>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account? <Link href="/" className="font-semibold text-cyan-700">Request access</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
