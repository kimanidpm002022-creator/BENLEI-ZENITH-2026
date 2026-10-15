export default function VendorsPage() {
  const vendors = [
    { name: 'Acme Supplies', contact: 'Jane K.', email: 'jane@acme.co', spend: '$82K' },
    { name: 'Bright Logistics', contact: 'David P.', email: 'david@brightlogistics.io', spend: '$64K' },
    { name: 'Apex Hardware', contact: 'Mary T.', email: 'mary@apexhardware.com', spend: '$118K' },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {vendors.map((vendor) => (
        <div key={vendor.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-slate-900">{vendor.name}</div>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Active</span>
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <div>Contact: {vendor.contact}</div>
            <div>Email: {vendor.email}</div>
            <div>Total spend: {vendor.spend}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
