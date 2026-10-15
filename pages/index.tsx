import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>UzaPoint Clone</title>
        <meta name="description" content="Demo site generated from spreadsheet data" />
      </Head>
      <main className="max-w-5xl mx-auto p-6">
        <header className="py-8">
          <h1 className="text-4xl font-bold">UzaPoint-style Demo</h1>
          <p className="mt-2 text-gray-600">Listings and pages seeded from demo data.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">Premium Plan</h2>
            <p className="mt-2 text-gray-600">Full features: A, B, C, and support.</p>
            <div className="mt-4 font-bold">$9.99 / month</div>
          </article>

          <article className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">Basic Plan</h2>
            <p className="mt-2 text-gray-600">Starter plan for small users.</p>
            <div className="mt-4 font-bold">$4.99 / month</div>
          </article>
        </section>

        <footer className="mt-12 text-sm text-gray-500">Built with Next.js • Tailwind • Prisma</footer>
      </main>
    </>
  )
}
