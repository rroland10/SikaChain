import type { Metadata } from "next";
import { StatusPage } from "@/components/status/StatusPage";

export const metadata: Metadata = {
  title: "System Status",
  description: "SikaChain website and network service status.",
};

export default function StatusRoute() {
  return <StatusPage />;
}
