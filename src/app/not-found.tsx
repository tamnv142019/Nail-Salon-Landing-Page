import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">404 — Page not found</h1>
        <p className="text-neutral-600 mb-6">
          Oops — the page you're looking for doesn't exist. You can try one of the links
          below or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-3 mb-6">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm">Home</Link>
          <Link href="/services" className="px-4 py-2 bg-neutral-100 text-neutral-900 rounded border">Services</Link>
          <Link href="/book" className="px-4 py-2 bg-emerald-600 text-white rounded">Book Now</Link>
          <Link href="/contact" className="px-4 py-2 bg-neutral-100 text-neutral-900 rounded border">Contact</Link>
          <Link href="/gallery" className="px-4 py-2 bg-neutral-100 text-neutral-900 rounded border">Gallery</Link>
        </div>

        <div className="text-sm text-neutral-500">
          <p className="mb-2">Helpful tips:</p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto">
            <li>Check the URL for typos.</li>
            <li>Use the navigation above to find what you need.</li>
            <li>Still stuck? <Link href="/contact" className="underline">Contact us</Link> — we're happy to help.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
