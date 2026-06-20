"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ProducerApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [referenceId, setReferenceId] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await res.json()) as { ok?: boolean; id?: string; message?: string; error?: string };

      if (!res.ok) {
        setState("error");
        setError(json.error || "Submission failed");
        return;
      }

      setReferenceId(json.id || "");
      setState("success");
      form.reset();
    } catch {
      setState("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel glow-green mx-auto max-w-2xl p-10 text-center"
          >
            <p className="text-4xl">✓</p>
            <h3 className="mt-4 font-display text-2xl font-bold">Application received</h3>
            <p className="mt-3 text-sm leading-relaxed text-sika-cream/70">
              Thank you. Our team will review your organization for the Genesis Producer Program and
              respond within 5–10 business days. A confirmation email will be sent if email delivery is
              configured.
            </p>
            {referenceId && (
              <p className="mt-4 font-mono text-xs text-sika-gold">Reference: {referenceId}</p>
            )}
            <button
              type="button"
              onClick={() => setState("idle")}
              className="btn-secondary glass-button mt-8"
            >
              Submit another application
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="glass-panel glow-gold mx-auto max-w-2xl space-y-6 p-8 md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Organization name" name="org" required />
              <Field label="Contact email" name="email" type="email" required />
              <Field label="Website" name="website" type="url" placeholder="https://" />
              <Field label="Jurisdiction" name="jurisdiction" required />
            </div>

            <Field label="Producer category" name="category" as="select" required>
              <option value="">Select category</option>
              <option>Blockchain infrastructure operator</option>
              <option>Fintech / mobile money partner</option>
              <option>Merchant / payment processor</option>
              <option>Bank / credit union / regulated financial partner</option>
              <option>Telecom / connectivity partner</option>
              <option>University / research institution</option>
              <option>Regional business group / chamber</option>
              <option>Community / economic development organization</option>
              <option>Other</option>
            </Field>

            <Field label="Regional focus" name="region" placeholder="e.g. Ghana, West Africa, Global" />

            <Field
              label="Technical infrastructure plan"
              name="infrastructure"
              as="textarea"
              rows={4}
              placeholder="Servers, uptime commitment, key management, DDoS protection, monitoring..."
            />

            <Field
              label="Ecosystem contribution plan"
              name="ecosystem"
              as="textarea"
              rows={4}
              placeholder="How will you support merchants, developers, agents, or local adoption?"
            />

            <Field
              label="Governance & compliance declaration"
              name="compliance"
              as="textarea"
              rows={3}
              placeholder="Compliance posture, conflict-of-interest disclosures..."
            />

            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {state === "error" && (
              <p className="rounded-xl border border-sika-red/30 bg-sika-red/10 px-4 py-3 text-sm text-sika-cream">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="btn-primary btn-shine w-full disabled:opacity-60 md:w-auto"
            >
              {state === "submitting" ? "Submitting…" : "Submit application"}
            </button>

            <p className="text-xs leading-relaxed text-sika-cream/50">
              Applications are stored securely for review. By submitting, you confirm the information
              is accurate and agree to participate in testnet qualification if shortlisted.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  rows?: number;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
};

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
  rows = 4,
  as = "input",
  children,
}: FieldProps) {
  const className = "glass-input mt-2 w-full rounded-xl px-4 py-3.5 text-sm";

  return (
    <label className="block text-sm font-medium text-sika-cream/90">
      {label}
      {required && <span className="text-sika-gold"> *</span>}
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={rows} placeholder={placeholder} className={className} />
      ) : as === "select" ? (
        <select name={name} required={required} className={className} defaultValue="">
          {children}
        </select>
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={className} />
      )}
    </label>
  );
}
