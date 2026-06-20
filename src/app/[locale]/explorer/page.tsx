import type { Metadata } from "next";
import { BlockExplorer } from "@/components/explorer/BlockExplorer";

export const metadata: Metadata = {
  title: "Block Explorer",
  description: "Browse SikaChainDev blocks — live development chain explorer.",
};

export default function ExplorerPage() {
  return <BlockExplorer />;
}
