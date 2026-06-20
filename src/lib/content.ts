export const site = {
  name: "SikaChain",
  tagline: "Settlement network for mobile money",
  description:
    "A blockchain settlement network built for mobile money, merchant payments, remittances, and low-cost digital transfers.",
  launchMarket: "Ghana",
  expansion: "Africa",
} as const;

export const positioning = {
  sikaChain:
    "A blockchain settlement network built for mobile money, merchant payments, remittances, and local digital commerce.",
  sikaApp:
    "A mobile money app that lets people send money, pay merchants, and access cash-in/cash-out services with low fees and instant settlement.",
  thesis:
    "SikaChain exists to power low-cost, transparent, mobile-first money movement for users, merchants, agents, and financial partners.",
} as const;

export const producerComposition = [
  { category: "Blockchain infrastructure operators", count: 5, purpose: "Secure and operate the chain" },
  { category: "Fintech / mobile money partners", count: 3, purpose: "Connect SikaChain to real payment use cases" },
  { category: "Merchant / payment processors", count: 2, purpose: "Support merchant acceptance" },
  { category: "Banks, credit unions, regulated financial partners", count: 2, purpose: "Add compliance and financial credibility" },
  { category: "Telecom / connectivity partners", count: 2, purpose: "Support mobile-first distribution" },
  { category: "Universities / research institutions", count: 2, purpose: "Add neutral technical legitimacy" },
  { category: "Regional business groups / chambers", count: 2, purpose: "Help drive local adoption" },
  { category: "Community / economic development organizations", count: 2, purpose: "Build grassroots trust" },
  { category: "SikaChain Foundation / genesis operator", count: 1, purpose: "Coordinate early launch operations" },
] as const;

export const producerBenefits = [
  "Block rewards and transaction-fee participation",
  "Governance rights and technical influence over network upgrades",
  "Recognition as genesis producers on the public producer dashboard",
  "Early ecosystem participation and grant program access",
  "Partnership opportunities with Sika App pilots",
  "Ability to propose ecosystem initiatives",
] as const;

export const technicalRequirements = [
  "Reliable server infrastructure with 99.5%+ uptime commitment",
  "Secure key management, DDoS protection, and monitoring",
  "Disaster recovery plan and backup infrastructure",
  "API endpoint capability and rapid upgrade capability",
  "Designated security contact",
] as const;

export const organizationalRequirements = [
  "Organization profile, jurisdiction, and public website",
  "Ownership and conflict-of-interest disclosure where appropriate",
  "Compliance posture and governance participation commitment",
  "Ecosystem contribution and marketing/distribution support plan",
  "Signed producer agreement",
] as const;

export const selectionStages = [
  {
    stage: "Private outreach",
    description: "Approach strategic candidates across infrastructure, fintech, payments, universities, telecoms, and merchant networks.",
  },
  {
    stage: "Public applications",
    description: "Open a formal window for candidates to submit infrastructure plans, compliance declarations, and ecosystem contribution plans.",
  },
  {
    stage: "Candidate showcase",
    description: "Publish qualified candidates publicly to build transparency and market confidence.",
  },
  {
    stage: "Testnet qualification",
    description: "Candidates operate on testnet for 30–60 days. Measure uptime, latency, upgrade responsiveness, and governance participation.",
  },
  {
    stage: "Final genesis selection",
    description: "Select 21 producers based on technical performance, institutional credibility, ecosystem value, geographic diversity, and mission alignment.",
  },
] as const;

export const governanceEntities = [
  {
    name: "Node producers",
    role: "Secure the network, produce blocks, participate in governance, and approve critical upgrades.",
  },
  {
    name: "SikaChain Foundation",
    role: "Protocol stewardship, grants, ecosystem development, public transparency, and governance coordination.",
  },
  {
    name: "Sika Labs / Sika Technologies",
    role: "Build commercial products, including Sika App.",
  },
  {
    name: "Independent oversight committee",
    role: "Review treasury movement, conflicts of interest, governance actions, and major protocol decisions.",
  },
] as const;

export const launchSequence = [
  { step: 1, title: "Announce SikaChain", message: "Introduce the settlement network for mobile money and low-cost digital transfers." },
  { step: 2, title: "Launch Genesis Producer Program", message: "Recruit 21 founding node producers from credible institutions." },
  { step: 3, title: "Showcase producer candidates", message: "Publish qualified candidates and their profiles." },
  { step: 4, title: "Launch public testnet", message: "Enable producers, developers, merchants, agents, and early users to test." },
  { step: 5, title: "Publish testnet report", message: "Share uptime, volume, producer performance, and governance participation." },
  { step: 6, title: "Announce final 21 producers", message: "Major credibility event before mainnet." },
  { step: 7, title: "Launch mainnet", message: "Explorer, governance portal, documentation, producer dashboard, and security report." },
  { step: 8, title: "Open Sika App private beta", message: "Invite agents, merchants, ambassadors, and early users." },
  { step: 9, title: "Launch first pilot market", message: "Ghana-first density: one city, community, or remittance corridor." },
  { step: 10, title: "Expand based on metrics", message: "Scale only after repeat transactions, reliable agents, merchant activity, and low fraud." },
] as const;

export const timeline = [
  {
    period: "Months 0–2",
    title: "Foundation",
    items: [
      "Whitepaper, governance model, and producer requirements",
      "Technical documentation and token/economic model",
      "Compliance strategy and Sika App product scope",
      "Target launch market: Ghana",
    ],
  },
  {
    period: "Months 2–4",
    title: "Producer recruitment",
    items: [
      "Launch Genesis Producer Program",
      "Target 40–60 candidates, 30 serious applicants",
      "Select 21 genesis producers and 10–20 standby producers",
    ],
  },
  {
    period: "Months 4–6",
    title: "Testnet",
    items: [
      "Producer dashboard, block explorer, governance simulation",
      "Sika App beta integration and API/security testing",
      "Public testnet report",
    ],
  },
  {
    period: "Months 6–7",
    title: "Mainnet",
    items: ["Launch SikaChain mainnet with 21 genesis producers"],
  },
  {
    period: "Months 7–9",
    title: "Sika App private beta",
    items: [
      "Selected users, agents, merchants, and support team",
      "Limited transaction corridors and basic compliance controls",
    ],
  },
  {
    period: "Months 9–12",
    title: "Public pilot in Ghana",
    items: [
      "10,000–50,000 users, 100–500 merchants, 50–200 agents",
      "Strong repeat transaction behavior and controlled fraud rate",
      "Measurable merchant payment and cash-in/cash-out volume",
    ],
  },
] as const;

export const ghanaStrategy = {
  headline: "Ghana first. Africa next.",
  intro:
    "SikaChain and Sika App will launch in Ghana — a market with deep mobile money culture, remittance corridors, merchant density, and agent networks. Success in one focused market creates the playbook for expansion across Africa.",
  rollout: [
    {
      title: "Dense city rollout",
      description: "Build user, merchant, agent, and liquidity density in one Ghanaian city before expanding nationally.",
    },
    {
      title: "Remittance corridors",
      description: "Pilot corridors such as United States → Ghana and Europe → Ghana for cross-border settlement.",
    },
    {
      title: "Closed communities",
      description: "Launch inside universities, employer networks, cooperatives, and trade groups for controlled early testing.",
    },
  ],
  targets: [
    "Agent network for cash-in and cash-out",
    "High-frequency merchant categories: food vendors, pharmacies, transport, airtime",
    "Stable-value balances in local currency — not volatile tokens for everyday users",
    "Compliance through licensed partners, not unlicensed speculation",
  ],
} as const;

export const sikaAppFeatures = [
  "Send money by phone number",
  "Receive money instantly",
  "QR merchant payments",
  "Cash-in/cash-out through agents",
  "Stable balance display and transaction history",
  "PIN and biometric login with account recovery",
  "Agent locator and fee transparency",
] as const;

export const navLinks = [
  { href: "/genesis", label: "Genesis Program" },
  { href: "/candidates", label: "Candidates" },
  { href: "/testnet", label: "Testnet" },
  { href: "/producers", label: "Producers" },
  { href: "/governance", label: "Governance" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/ghana", label: "Ghana Launch" },
  { href: "/sika-app", label: "Sika App" },
] as const;
