import type { Metadata } from "next";
import { TestnetDashboard } from "@/components/producers/TestnetDashboard";

export const metadata: Metadata = {
  title: "Testnet Dashboard",
  description: "SikaChain testnet producer performance — uptime, block production, and qualification metrics.",
};

export default function TestnetPage() {
  return <TestnetDashboard />;
}
