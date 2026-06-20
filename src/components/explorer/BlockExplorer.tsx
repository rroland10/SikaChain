"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { PageHero, SectionBlock } from "@/components/PageSections";
import { TransactionDetailModal } from "@/components/explorer/TransactionDetailModal";
import { chainConfig } from "@/lib/chain-client";
import type { TransactionSummary } from "@/lib/chain-client";

type BlockRow = {
  blockNum: number;
  id: string;
  timestamp: string;
  producer: string;
  transactionCount: number;
  confirmed: boolean;
};

type ChainData = {
  online: boolean;
  chainId?: string;
  headBlock?: number;
  lib?: number;
  blocks?: BlockRow[];
  offset?: number;
  limit?: number;
  hasMore?: boolean;
};

const PAGE_SIZE = 10;

export function BlockExplorer() {
  const [data, setData] = useState<ChainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [lookup, setLookup] = useState("");
  const [lookupResult, setLookupResult] = useState<BlockRow | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [txLookup, setTxLookup] = useState("");
  const [txResult, setTxResult] = useState<{ blockNum: number; transaction: TransactionSummary } | null>(
    null,
  );
  const [selectedTx, setSelectedTx] = useState<{ tx: TransactionSummary; blockNum: number } | null>(
    null,
  );
  const [txError, setTxError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/chain?limit=${PAGE_SIZE}&offset=${offset}`);
        setData(await res.json());
      } catch {
        setData({ online: false });
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    load();
    const id = window.setInterval(load, 10000);
    return () => window.clearInterval(id);
  }, [offset]);

  async function searchBlock(e: React.FormEvent) {
    e.preventDefault();
    setLookupError("");
    setLookupResult(null);
    const num = parseInt(lookup, 10);
    if (Number.isNaN(num)) {
      setLookupError("Enter a valid block number");
      return;
    }
    const res = await fetch(`/api/chain?block=${num}`);
    if (!res.ok) {
      setLookupError("Block not found");
      return;
    }
    const json = await res.json();
    setLookupResult(json.block);
  }

  async function searchTransaction(e: React.FormEvent) {
    e.preventDefault();
    setTxError("");
    setTxResult(null);
    if (!txLookup.trim()) {
      setTxError("Enter a transaction ID");
      return;
    }
    const res = await fetch(`/api/chain?tx=${encodeURIComponent(txLookup.trim())}`);
    if (!res.ok) {
      setTxError("Transaction not found in recent blocks");
      return;
    }
    setTxResult(await res.json());
  }

  const canGoNewer = offset > 0;
  const canGoOlder = data?.hasMore ?? false;

  return (
    <>
      <PageHero
        eyebrow="Block explorer"
        title="SikaChainDev block explorer"
        lead="Browse recent blocks from the local Spring development chain. Production mainnet will launch with a full explorer, producer dashboard, and governance portal."
        primaryCta={{ href: "/testnet", label: "Testnet dashboard" }}
        secondaryCta={{ href: "/docs", label: "Documentation" }}
      />

      <SectionBlock tag="Chain" title="Network overview">
        <FadeIn>
          <div className="glass-panel glow-green grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4 md:p-8">
            <Stat label="Status" value={loading ? "…" : data?.online ? "Online" : "Offline"} />
            <Stat label="Head block" value={data?.headBlock?.toLocaleString() ?? "—"} />
            <Stat label="LIB" value={data?.lib?.toLocaleString() ?? "—"} />
            <Stat
              label="Chain ID"
              value={data?.chainId ? `${data.chainId.slice(0, 8)}…` : "—"}
              mono
            />
          </div>
        </FadeIn>

        {!loading && !data?.online && (
          <p className="mt-4 text-sm text-sika-cream/60">
            Start SikaChainDev at <code className="text-sika-gold">{chainConfig.rpcUrl}</code>
          </p>
        )}
      </SectionBlock>

      <SectionBlock tag="Lookup" title="Search" className="border-t border-white/10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm text-sika-cream/60">Block number</p>
            <form onSubmit={searchBlock} className="flex flex-wrap gap-3">
              <input
                value={lookup}
                onChange={(e) => setLookup(e.target.value)}
                placeholder="e.g. 42"
                className="glass-input rounded-xl px-4 py-3 text-sm md:w-48"
              />
              <button type="submit" className="btn-primary btn-shine text-sm">
                Search
              </button>
            </form>
            {lookupError && <p className="mt-3 text-sm text-sika-red">{lookupError}</p>}
            {lookupResult && (
              <div className="card mt-6">
                <BlockDetail block={lookupResult} />
                <Link
                  href={`/explorer/block/${lookupResult.blockNum}`}
                  className="mt-4 inline-block text-sm text-sika-gold hover:underline"
                >
                  View full block →
                </Link>
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 text-sm text-sika-cream/60">Transaction ID</p>
            <form onSubmit={searchTransaction} className="flex flex-wrap gap-3">
              <input
                value={txLookup}
                onChange={(e) => setTxLookup(e.target.value)}
                placeholder="64-char hex trx id"
                className="glass-input min-w-[240px] flex-1 rounded-xl px-4 py-3 font-mono text-xs"
              />
              <button type="submit" className="btn-secondary glass-button text-sm">
                Find tx
              </button>
            </form>
            {txError && <p className="mt-3 text-sm text-sika-red">{txError}</p>}
            {txResult && (
              <div className="card mt-6 text-sm">
                <p className="break-all font-mono text-xs text-sika-cream/75">{txResult.transaction.id}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedTx({ tx: txResult.transaction, blockNum: txResult.blockNum })
                    }
                    className="text-sika-gold hover:underline"
                  >
                    View transaction details
                  </button>
                  <Link
                    href={`/explorer/block/${txResult.blockNum}`}
                    className="text-sika-cream/60 hover:text-sika-gold hover:underline"
                  >
                    Open block {txResult.blockNum.toLocaleString()}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock tag="Recent blocks" title="Latest blocks" className="border-t border-white/10 bg-black/20 pb-24">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-sika-cream/55">
            Showing {PAGE_SIZE} blocks
            {offset > 0 ? ` · offset ${offset} from head` : " · from chain head"}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!canGoNewer || loading}
              onClick={() => setOffset((value) => Math.max(0, value - PAGE_SIZE))}
              className="btn-secondary glass-button px-4 py-2 text-xs disabled:opacity-40"
            >
              Newer
            </button>
            <button
              type="button"
              disabled={!canGoOlder || loading}
              onClick={() => setOffset((value) => value + PAGE_SIZE)}
              className="btn-secondary glass-button px-4 py-2 text-xs disabled:opacity-40"
            >
              Older
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton h-16 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[1.35rem] border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.04] text-sika-gold">
                <tr>
                  <th className="px-5 py-4">Block</th>
                  <th className="px-5 py-4">Producer</th>
                  <th className="px-5 py-4">Txs</th>
                  <th className="px-5 py-4">Time</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {(data?.blocks ?? []).map((block) => (
                  <tr key={block.id} className="border-t border-white/10 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <Link
                        href={`/explorer/block/${block.blockNum}`}
                        className="font-display font-bold text-sika-gold hover:underline"
                      >
                        {block.blockNum.toLocaleString()}
                      </Link>
                    </td>
                    <td className="px-5 py-4">{block.producer}</td>
                    <td className="px-5 py-4">{block.transactionCount}</td>
                    <td className="px-5 py-4 text-sika-cream/60">
                      {block.timestamp ? new Date(block.timestamp).toLocaleString() : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] uppercase ${
                          block.confirmed
                            ? "border-sika-green/30 text-sika-green-bright"
                            : "border-sika-gold/30 text-sika-gold"
                        }`}
                      >
                        {block.confirmed ? "Final" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionBlock>

      <TransactionDetailModal
        tx={selectedTx?.tx ?? null}
        blockNum={selectedTx?.blockNum ?? 0}
        onClose={() => setSelectedTx(null)}
      />
    </>
  );
}

function Stat({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-sika-cream/45">{label}</p>
      <p className={`font-display text-xl font-bold text-sika-gold ${mono ? "font-mono text-sm" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function BlockDetail({ block }: { block: BlockRow }) {
  return (
    <div className="grid gap-4 text-sm md:grid-cols-2">
      <div>
        <p className="text-[10px] uppercase tracking-wider text-sika-gold">Block</p>
        <p className="font-display text-2xl font-bold">{block.blockNum.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-sika-gold">Producer</p>
        <p>{block.producer}</p>
      </div>
      <div className="md:col-span-2">
        <p className="text-[10px] uppercase tracking-wider text-sika-gold">Block ID</p>
        <p className="break-all font-mono text-xs text-sika-cream/70">{block.id}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-sika-gold">Transactions</p>
        <p>{block.transactionCount}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-sika-gold">Finality</p>
        <p>{block.confirmed ? "Irreversible" : "Pending IF"}</p>
      </div>
    </div>
  );
}
