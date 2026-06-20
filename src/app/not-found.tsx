import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="section-tag mb-4">404</p>
      <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-sika-cream/65">
        This route doesn&apos;t exist on SikaChain yet. Return to the settlement network overview or
        explore the Genesis Producer Program.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-primary btn-shine">
          Back to home
        </Link>
        <Link href="/genesis" className="btn-secondary glass-button">
          Genesis program
        </Link>
      </div>
    </section>
  );
}
