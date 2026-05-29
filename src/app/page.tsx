import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold">Frontend assessment</h1>
      <p className="mt-2 text-muted">
        Calculator and used cars listing built with Next.js, Zustand, and Framer Motion.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/calculator" className="glass rounded-2xl p-6 hover:border-cyan-400/40">
          <h2 className="text-lg font-semibold">Calculator</h2>
          <p className="mt-2 text-sm text-muted">
            Basic math, history, keyboard support, light/dark theme.
          </p>
        </Link>
        <Link href="/cars" className="glass rounded-2xl p-6 hover:border-cyan-400/40">
          <h2 className="text-lg font-semibold">Used cars</h2>
          <p className="mt-2 text-sm text-muted">
            Filter, sort, and view car details in a modal.
          </p>
        </Link>
      </div>
    </div>
  );
}
