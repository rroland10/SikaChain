import type { Metadata } from "next";
import { CandidatesShowcasePage } from "@/components/candidates/CandidatesShowcasePage";

export const metadata: Metadata = {
  title: "Producer Candidates",
  description:
    "Public showcase of qualified SikaChain genesis producer candidates — transparency before final selection of 21 founding node producers.",
};

export default function CandidatesPage() {
  return <CandidatesShowcasePage />;
}
