import type { Metadata } from "next";
import { BlockDetailView } from "@/components/explorer/BlockDetailView";

type PageProps = {
  params: { num: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const blockNum = parseInt(params.num, 10);
  const label = Number.isNaN(blockNum) ? params.num : `#${blockNum.toLocaleString()}`;

  return {
    title: `Block ${label}`,
    description: `SikaChainDev block ${label} — transactions and finality.`,
  };
}

export default function BlockDetailPage({ params }: PageProps) {
  const blockNum = parseInt(params.num, 10);

  if (Number.isNaN(blockNum) || blockNum < 1) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-sika-gold">Invalid block</h1>
        <p className="mt-4 text-sika-cream/70">Enter a valid block number from the explorer.</p>
      </div>
    );
  }

  return <BlockDetailView blockNum={blockNum} />;
}
