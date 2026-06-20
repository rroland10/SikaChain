export const docsSections = [
  {
    title: "Overview",
    items: [
      { label: "What is SikaChain?", href: "/", description: "Settlement network positioning" },
      { label: "Genesis Producer Program", href: "/genesis", description: "Recruiting 21 founding producers" },
      { label: "Launch announcement", href: "/announce", description: "Official GTM messaging" },
      { label: "Press kit", href: "/press", description: "Brand assets and boilerplate" },
    ],
  },
  {
    title: "Network",
    items: [
      { label: "Producer requirements", href: "/producers", description: "Technical and org standards" },
      { label: "Candidate showcase", href: "/candidates", description: "Public transparency profiles" },
      { label: "Testnet dashboard", href: "/testnet", description: "Uptime and block production" },
      { label: "Block explorer", href: "/explorer", description: "Live SikaChainDev blocks" },
      { label: "Governance", href: "/governance", description: "Four-pillar structure" },
    ],
  },
  {
    title: "Launch",
    items: [
      { label: "12-month roadmap", href: "/roadmap", description: "Foundation through Ghana pilot" },
      { label: "Ghana strategy", href: "/ghana", description: "First market density plan" },
      { label: "Sika App", href: "/sika-app", description: "Consumer mobile money product" },
      { label: "Apply as producer", href: "/apply", description: "Genesis application form" },
    ],
  },
  {
    title: "Developer",
    items: [
      { label: "Developer quickstart", href: "/developers", description: "RPC, chain ID, WharfKit, cleos" },
      { label: "SikaChainDev RPC", href: "/explorer", description: "http://127.0.0.1:8888" },
      { label: "Spring node software", href: "https://github.com/AntelopeIO/spring", description: "AntelopeOS Spring", external: true },
      { label: "Local dev scripts", href: "https://github.com/AntelopeIO/spring/tree/main/sikachaindev", description: "sikachaindev/", external: true },
    ],
  },
] as const;

export const announceContent = {
  headline: "SikaChain — a settlement network for mobile money",
  subheadline:
    "Built for merchant payments, remittances, agent banking, and low-cost digital transfers. Ghana first. Africa next.",
  body: `SikaChain is a new blockchain settlement network built for mobile money, merchant payments, remittances, and low-cost digital transfers. The network will launch with 21 genesis node producers selected from infrastructure operators, fintech partners, merchant networks, regional institutions, and community organizations.

Its first flagship application, Sika App, will allow users to send money, pay merchants, and access cash-in/cash-out services through local agents — without exposing everyday users to volatile crypto assets or seed phrases.

SikaChain is financial infrastructure. Sika App is the user product. The 21 genesis producers are the institutional trust layer.`,
  consumerMessage: "Send money instantly. Pay merchants. Cash in and cash out nearby.",
  infrastructureMessage:
    "Powered by SikaChain for low-cost, transparent settlement.",
  quotes: [
    {
      role: "Infrastructure positioning",
      text: "SikaChain exists to power low-cost, transparent, mobile-first money movement for users, merchants, agents, and financial partners.",
    },
    {
      role: "Consumer positioning",
      text: "Sika App lets people send money, pay merchants, and access cash-in/cash-out services with low fees and instant settlement — not another crypto wallet.",
    },
  ],
} as const;

export const primaryNavLinks = [
  { href: "/genesis", label: "Genesis" },
  { href: "/candidates", label: "Candidates" },
  { href: "/testnet", label: "Testnet" },
  { href: "/ghana", label: "Ghana" },
  { href: "/docs", label: "Docs" },
] as const;

export const secondaryNavLinks = [
  { href: "/producers", label: "Producers" },
  { href: "/governance", label: "Governance" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/sika-app", label: "Sika App" },
  { href: "/developers", label: "Developers" },
  { href: "/explorer", label: "Explorer" },
  { href: "/announce", label: "Announce" },
  { href: "/press", label: "Press" },
  { href: "/status", label: "Status" },
] as const;
