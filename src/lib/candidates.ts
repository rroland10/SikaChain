export type ShowcaseCandidate = {
  id: string;
  name: string;
  category: string;
  jurisdiction: string;
  region: string;
  summary: string;
  focus: string[];
  status: "Qualified" | "Testnet active" | "Under review";
  website?: string;
};

/** Public showcase profiles — illustrative candidates for the Genesis Producer Program recruitment phase. */
export const showcaseCandidates: ShowcaseCandidate[] = [
  {
    id: "accra-block-services",
    name: "Accra Block Services",
    category: "Blockchain infrastructure operator",
    jurisdiction: "Ghana",
    region: "West Africa",
    summary:
      "Regional Antelope infrastructure operator with 99.7% historical uptime across test environments. Focused on Savanna finality and low-latency settlement for mobile money workloads.",
    focus: ["Node operations", "DDoS protection", "Disaster recovery"],
    status: "Testnet active",
    website: "https://example.com",
  },
  {
    id: "mobile-money-bridge",
    name: "Mobile Money Bridge Ltd",
    category: "Fintech / mobile money partner",
    jurisdiction: "Ghana",
    region: "Ghana · ECOWAS",
    summary:
      "Licensed payment aggregator connecting merchant networks and agent banking channels. Brings real cash-in/cash-out density for Sika App pilots in Accra.",
    focus: ["Agent networks", "Merchant onboarding", "Compliance partnerships"],
    status: "Qualified",
  },
  {
    id: "kumasi-merchant-network",
    name: "Kumasi Merchant Network",
    category: "Merchant / payment processor",
    jurisdiction: "Ghana",
    region: "Ashanti Region",
    summary:
      "Coalition of high-frequency merchants — food vendors, pharmacies, and transport operators — ready to accept QR payments through Sika App at launch.",
    focus: ["QR acceptance", "Instant settlement", "Merchant tooling"],
    status: "Qualified",
  },
  {
    id: "ghana-cooperative-bank-node",
    name: "Ghana Cooperative Banking Alliance",
    category: "Bank / credit union / regulated financial partner",
    jurisdiction: "Ghana",
    region: "National",
    summary:
      "Regulated financial institution consortium providing compliance credibility, treasury oversight alignment, and e-money partnership pathways for stable-value UX.",
    focus: ["Compliance", "Regulatory credibility", "Stable balances"],
    status: "Under review",
  },
  {
    id: "telecom-connect-gh",
    name: "TelecomConnect Ghana",
    category: "Telecom / connectivity partner",
    jurisdiction: "Ghana",
    region: "National",
    summary:
      "Mobile-first distribution partner enabling USSD fallbacks, SIM-based onboarding, and rural connectivity for agent-led cash-in/cash-out expansion.",
    focus: ["Mobile distribution", "Rural reach", "USSD integration"],
    status: "Qualified",
  },
  {
    id: "legon-research-node",
    name: "University of Ghana Research Node",
    category: "University / research institution",
    jurisdiction: "Ghana",
    region: "Accra",
    summary:
      "Neutral academic operator contributing governance research, security audits, and developer education for the SikaChain ecosystem in West Africa.",
    focus: ["Research", "Developer education", "Neutral legitimacy"],
    status: "Testnet active",
  },
  {
    id: "west-africa-chamber",
    name: "West Africa Business Chamber",
    category: "Regional business group / chamber",
    jurisdiction: "Ghana",
    region: "ECOWAS",
    summary:
      "Chamber-led producer seat driving merchant adoption, regional institution outreach, and cross-border remittance corridor partnerships.",
    focus: ["Regional adoption", "Institution outreach", "Trade networks"],
    status: "Under review",
  },
  {
    id: "community-impact-gh",
    name: "Community Impact Ghana",
    category: "Community / economic development organization",
    jurisdiction: "Ghana",
    region: "Greater Accra",
    summary:
      "Grassroots economic development organization focused on financial inclusion, agent training, and trusted local onboarding for underserved communities.",
    focus: ["Financial inclusion", "Agent training", "Community trust"],
    status: "Qualified",
  },
];

export const candidateStatuses = ["Qualified", "Testnet active", "Under review"] as const;
