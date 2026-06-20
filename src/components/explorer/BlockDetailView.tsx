"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { TransactionDetailModal } from "@/components/explorer/TransactionDetailModal";
import { chainConfig } from "@/lib/chain-client";
import type { BlockDetail, TransactionSummary } from "@/lib/chain-client";

type BlockDetailViewProps = {
  blockNum: number;
};

export function BlockDetailView({ blockNum }: BlockDetailViewProps) {
  const [block, setBlock] = useState<BlockDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTx, setSelectedTx] = useState<TransactionSummary | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/chain?block=${blockNum}&detail=1`);
        if (!res.ok) {
          setError("Block not found");
          setBlock(null);
          return;
        }
        const json = (await res.json()) as { block: BlockDetail };
        setBlock(json.block);
      } catch {
        setError("Failed to load block");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [blockNum]);

  return (
    <>
      <PageHero
        eyebrow="Block detail"
        title={`Block #${blockNum.toLocaleString()}`}
        lead="Transaction list and finality status from SikaChainDev."
        primaryCta={{ href: "/explorer", label: "Back to explorer" }}
        secondaryCta={{
          href: blockNum > 1 ? `/explorer/block/${blockNum - 1}` : "/explorer",
          label: "Previous block",
        }}
      />

      <SectionBlock tag="Block" title="Overview">
        {loading ? (
          <div className="skeleton h-40 rounded-2xl" />
        ) : error ? (
          <p className="text-sm text-sika-red">{error}</p>
        ) : block ? (
          <FadeIn>
            <div className="glass-panel grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 md:p-8">
              <Field label="Producer" value={block.producer} />
              <Field label="Transactions" value={String(block.transactionCount)} />
              <Field
                label="Finality"
                value={block.confirmed ? "Irreversible" : "Pending IF"}
              />
              <Field
                label="Timestamp"
                value={block.timestamp ? new Date(block.timestamp).toLocaleString() : "—"}
              />
              <Field label="Previous" value={block.previous} mono />
              <Field label="Block ID" value={block.id} mono />
            </div>
          </FadeIn>
        ) : null}

        {!loading && !block && !error && (
          <p className="text-sm text-sika-cream/60">
            Start SikaChainDev at <code className="text-sika-gold">{chainConfig.rpcUrl}</code>
          </p>
        )}
      </SectionBlock>

      <SectionBlock
        tag="Transactions"
        title={`Actions in block (${block?.transactions.length ?? 0})`}
        className="border-t border-white/10 pb-24"
      >
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-20 rounded-2xl" />
            ))}
          </div>
        ) : block && block.transactions.length === 0 ? (
          <p className="text-sm text-sika-cream/60">No transactions in this block.</p>
        ) : (
          <div className="space-y-4">
            {block?.transactions.map((tx) => (
              <TransactionCard
                key={tx.id}
                tx={tx}
                blockNum={blockNum}
                onSelect={() => setSelectedTx(tx)}
              />
            ))}
          </div>
        )}

        {block && (
          <div className="mt-10 flex flex-wrap gap-3">
            {blockNum > 1 && (
              <Link href={`/explorer/block/${blockNum - 1}`} className="btn-secondary glass-button text-sm">
                ← Block {blockNum - 1}
              </Link>
            )}
            <Link href={`/explorer/block/${blockNum + 1}`} className="btn-secondary glass-button text-sm">
              Block {blockNum + 1} →
            </Link>
          </div>
        )}
      </SectionBlock>

      <TransactionDetailModal tx={selectedTx} blockNum={blockNum} onClose={() => setSelectedTx(null)} />
    </>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-sika-cream/45">{label}</p>
      <p className={`mt-1 text-sm text-sika-cream ${mono ? "break-all font-mono text-xs" : ""}`}>{value}</p>
    </div>
  );
}

function TransactionCard({
  tx,
  blockNum,
  onSelect,
}: {
  tx: TransactionSummary;
  blockNum: number;
  onSelect: () => void;
}) {
  const preview = tx.actions[0];

  return (
    <button
      type="button"
      onClick={onSelect}
      className="card w-full p-5 text-left transition hover:border-sika-gold/25 hover:bg-white/[0.02]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-sika-gold">Transaction</p>
          <p className="break-all font-mono text-xs text-sika-cream/80">{tx.id.slice(0, 24)}…</p>
        </div>
        <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase text-sika-cream/60">
          {tx.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-sika-cream/55">
        <span>{tx.actions.length} action{tx.actions.length === 1 ? "" : "s"}</span>
        <span>CPU {tx.cpuUsageUs.toLocaleString()} µs</span>
        <span>Block {blockNum.toLocaleString()}</span>
      </div>

      {preview ? (
        <p className="mt-3 font-mono text-xs text-sika-cream/70">
          <span className="text-sika-gold">{preview.account}</span>
          <span className="text-sika-cream/50"> :: </span>
          {preview.name}
          {tx.actions.length > 1 && <span className="text-sika-cream/45"> +{tx.actions.length - 1} more</span>}
        </p>
      ) : (
        <p className="mt-3 text-xs text-sika-cream/50">Click for transaction details</p>
      )}

      <p className="mt-3 text-xs text-sika-gold">View details →</p>
    </button>
  );
}
