"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

type AdminLoginProps = {
  input: string;
  error: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function AdminLogin({ input, error, onInputChange, onSubmit }: AdminLoginProps) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <FadeIn>
        <form onSubmit={onSubmit} className="glass-panel glow-gold w-full max-w-md p-8">
          <p className="section-tag mb-3">Admin</p>
          <h1 className="font-display text-2xl font-bold">Content & operations</h1>
          <p className="mt-3 text-sm text-sika-cream/60">
            Manage insights, site copy, applications, and showcase profiles. Set{" "}
            <code className="text-sika-gold">ADMIN_TOKEN</code> in your environment.
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Admin token"
            className="glass-input mt-6 w-full rounded-xl px-4 py-3 text-sm"
            required
          />
          {error && <p className="mt-3 text-sm text-sika-red">{error}</p>}
          <button type="submit" className="btn-primary btn-shine mt-6 w-full">
            Sign in
          </button>
          <Link href="/" className="mt-4 block text-center text-xs text-sika-cream/45 hover:text-sika-gold">
            ← Back to site
          </Link>
        </form>
      </FadeIn>
    </section>
  );
}
