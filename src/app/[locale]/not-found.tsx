import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="section-tag mb-3">404</p>
      <h1 className="font-display text-4xl font-bold">Page not found</h1>
      <p className="mt-4 max-w-md text-sm text-sika-cream/60">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link href="/" className="btn-primary btn-shine mt-8">
        Back to home
      </Link>
    </section>
  );
}
