"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { TransactionSummary } from "@/lib/chain-client";

type TransactionDetailModalProps = {
  tx: TransactionSummary | null;
  blockNum: number;
  onClose: () => void;
};

export function TransactionDetailModal({ tx, blockNum, onClose }: TransactionDetailModalProps) {
  useEffect(() => {
    if (!tx) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [tx, onClose]);

  async function copyId() {
    if (!tx) return;
    await navigator.clipboard.writeText(tx.id);
  }

  return (
    <AnimatePresence>
      {tx && (
        <>
          <motion.button
            type="button"
            aria-label="Close transaction details"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tx-modal-title"
            className="fixed inset-x-4 top-[10vh] z-50 mx-auto max-h-[80vh] max-w-2xl overflow-y-auto rounded-[1.35rem] border border-white/10 bg-sika-ink/95 p-6 shadow-2xl md:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-tag mb-2">Transaction</p>
                <h2 id="tx-modal-title" className="font-display text-xl font-bold">
                  Block {blockNum.toLocaleString()}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-sika-cream/60 hover:text-sika-gold"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="glass-inset rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-wider text-sika-gold">Transaction ID</p>
                <p className="mt-2 break-all font-mono text-xs text-sika-cream/80">{tx.id}</p>
                <button
                  type="button"
                  onClick={copyId}
                  className="btn-secondary glass-button mt-3 text-xs"
                >
                  Copy ID
                </button>
              </div>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div className="glass-inset rounded-xl px-4 py-3">
                  <dt className="text-[10px] uppercase tracking-wider text-sika-cream/45">Status</dt>
                  <dd className="mt-1 capitalize">{tx.status}</dd>
                </div>
                <div className="glass-inset rounded-xl px-4 py-3">
                  <dt className="text-[10px] uppercase tracking-wider text-sika-cream/45">Actions</dt>
                  <dd className="mt-1">{tx.actions.length}</dd>
                </div>
                <div className="glass-inset rounded-xl px-4 py-3">
                  <dt className="text-[10px] uppercase tracking-wider text-sika-cream/45">CPU</dt>
                  <dd className="mt-1">{tx.cpuUsageUs.toLocaleString()} µs</dd>
                </div>
                <div className="glass-inset rounded-xl px-4 py-3">
                  <dt className="text-[10px] uppercase tracking-wider text-sika-cream/45">NET</dt>
                  <dd className="mt-1">{tx.netUsageWords} words</dd>
                </div>
              </dl>

              {tx.actions.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-white/[0.04] text-sika-gold">
                      <tr>
                        <th className="px-4 py-3">Action</th>
                        <th className="px-4 py-3">Authorization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tx.actions.map((action, index) => (
                        <tr key={`${tx.id}-${index}`} className="border-t border-white/10">
                          <td className="px-4 py-3 font-mono text-xs">
                            <span className="text-sika-gold">{action.account}</span>
                            <span className="text-sika-cream/50"> :: </span>
                            <span>{action.name}</span>
                          </td>
                          <td className="px-4 py-3 text-sika-cream/70">
                            {action.actors.join(", ") || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-sika-cream/55">
                  Full action data is unavailable for this transaction — only the ID was returned by the
                  node.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
