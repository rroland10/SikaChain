import {
  ghanaStrategy,
  governanceEntities,
  launchSequence,
  positioning,
  producerBenefits,
  producerComposition,
  selectionStages,
  site,
  sikaAppFeatures,
  technicalRequirements,
  timeline,
} from "./content";

export type KnowledgeChunk = {
  id: string;
  topic: string;
  text: string;
  keywords: string[];
  link?: string;
};

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "overview",
    topic: "What is SikaChain",
    text: `${site.description} ${positioning.thesis} SikaChain is financial infrastructure — not a consumer crypto product.`,
    keywords: ["sikachain", "what", "settlement", "network", "blockchain", "infrastructure", "mobile money"],
    link: "/",
  },
  {
    id: "sika-app",
    topic: "Sika App",
    text: `${positioning.sikaApp} Users should see stable local balances like "I sent ₵200" — not volatile tokens or gas fees. Features include: ${sikaAppFeatures.slice(0, 5).join(", ")}.`,
    keywords: ["sika app", "app", "wallet", "mobile", "consumer", "send", "merchant", "cash"],
    link: "/sika-app",
  },
  {
    id: "genesis",
    topic: "Genesis Producer Program",
    text: `SikaChain is selecting 21 founding node producers. Target 40–60 candidates. Benefits include: ${producerBenefits.slice(0, 3).join("; ")}. Apply at /apply. Producer seats are operational roles — not passive investments.`,
    keywords: ["genesis", "producer", "node", "apply", "validator", "block producer", "21"],
    link: "/genesis",
  },
  {
    id: "composition",
    topic: "Producer composition",
    text: `Recommended mix: ${producerComposition.map((p) => `${p.count} ${p.category.toLowerCase()}`).join(", ")}.`,
    keywords: ["composition", "coalition", "categories", "institutional", "trust"],
    link: "/genesis",
  },
  {
    id: "requirements",
    topic: "Producer requirements",
    text: `Technical: ${technicalRequirements.join("; ")}. Testnet qualification runs 30–60 days measuring uptime, latency, governance participation, and security readiness.`,
    keywords: ["requirements", "technical", "uptime", "security", "testnet", "qualification"],
    link: "/producers",
  },
  {
    id: "selection",
    topic: "Selection process",
    text: `Five stages: ${selectionStages.map((s) => s.stage).join(" → ")}.`,
    keywords: ["selection", "process", "onboarding", "showcase", "application", "candidates"],
    link: "/candidates",
  },
  {
    id: "ghana",
    topic: "Ghana launch",
    text: `${ghanaStrategy.headline} ${ghanaStrategy.intro} Rollout options: ${ghanaStrategy.rollout.map((r) => r.title).join(", ")}.`,
    keywords: ["ghana", "africa", "launch", "pilot", "market", "accra", "west africa"],
    link: "/ghana",
  },
  {
    id: "governance",
    topic: "Governance",
    text: governanceEntities.map((e) => `${e.name}: ${e.role}`).join(" "),
    keywords: ["governance", "foundation", "oversight", "treasury", "vote", "upgrade"],
    link: "/governance",
  },
  {
    id: "roadmap",
    topic: "Roadmap",
    text: `12-month plan: ${timeline.map((t) => `${t.period} ${t.title}`).join("; ")}.`,
    keywords: ["roadmap", "timeline", "months", "mainnet", "testnet", "beta", "pilot"],
    link: "/roadmap",
  },
  {
    id: "launch-sequence",
    topic: "Launch sequence",
    text: launchSequence.map((s) => `Step ${s.step}: ${s.title}`).join(". "),
    keywords: ["launch", "sequence", "steps", "announce", "mainnet"],
    link: "/roadmap",
  },
  {
    id: "docs",
    topic: "Documentation",
    text: "Documentation hub at /docs covers genesis program, testnet, governance, Ghana launch, block explorer, and developer resources for SikaChainDev.",
    keywords: ["docs", "documentation", "guide", "resources", "developer", "rpc"],
    link: "/docs",
  },
  {
    id: "press",
    topic: "Press kit",
    text: "Media and partners can download brand assets, copy official boilerplate, and read launch messaging at /press. Includes logos, positioning language, and links to the genesis program.",
    keywords: ["press", "media", "brand", "logo", "assets", "boilerplate", "journalist"],
    link: "/press",
  },
  {
    id: "status",
    topic: "System status",
    text: "Check platform health at /status — website, storage backend (local or Vercel Blob), email configuration, admin setup, and chain RPC connectivity.",
    keywords: ["status", "health", "uptime", "operational", "down"],
    link: "/status",
  },
  {
    id: "developers",
    topic: "Developer quickstart",
    text: "Build on SikaChainDev at /developers — chain ID, RPC, WharfKit SessionKit snippet, cleos commands, and local Spring node setup synced from sikachaindev/chain.json.",
    keywords: ["developer", "rpc", "wharfkit", "cleos", "sdk", "build", "integrate", "chain id"],
    link: "/developers",
  },
  {
    id: "explorer",
    topic: "Block explorer",
    text: "Browse live SikaChainDev blocks at /explorer — paginated block list, block search, transaction lookup, and Savanna finality status. Block detail pages at /explorer/block/[number] show actions and authorizations when the local node is running.",
    keywords: ["explorer", "blocks", "block", "transaction", "browse"],
    link: "/explorer",
  },
  {
    id: "testnet",
    topic: "Testnet dashboard",
    text: "The testnet dashboard at /testnet shows live SikaChainDev block production, uptime signals, and producer qualification metrics. Candidates operate on testnet for 30–60 days before genesis selection.",
    keywords: ["testnet", "dashboard", "uptime", "performance", "blocks", "qualification"],
    link: "/testnet",
  },
  {
    id: "candidates",
    topic: "Candidate showcase",
    text: "SikaChain publishes qualified genesis producer candidates publicly for transparency. Profiles show organizations under review or active on testnet before final selection of 21 producers. See /candidates.",
    keywords: ["candidates", "showcase", "qualified", "profiles", "transparent"],
    link: "/candidates",
  },
  {
    id: "agents-merchants",
    topic: "Agents and merchants",
    text: "Agents enable cash-in, cash-out, onboarding, and local trust. Merchants provide places to spend. Without both, the app is just another wallet. Ghana launch builds density before expansion.",
    keywords: ["agent", "merchant", "cash in", "cash out", "liquidity", "qr", "payment"],
    link: "/ghana",
  },
  {
    id: "fees",
    topic: "Fees and economics",
    text: "SikaChain targets low-cost, transparent settlement. Sika App shows simple local fees. The native SIKA token powers producer staking and network fees behind the scenes — users see stable currency balances.",
    keywords: ["fee", "fees", "cost", "cheap", "sika token", "economics", "stable"],
  },
];

export function scoreChunk(query: string, chunk: KnowledgeChunk): number {
  const q = query.toLowerCase();
  let score = 0;

  for (const kw of chunk.keywords) {
    if (q.includes(kw)) score += kw.includes(" ") ? 4 : 2;
  }

  const words = q.split(/\s+/).filter((w) => w.length > 2);
  for (const word of words) {
    if (chunk.text.toLowerCase().includes(word)) score += 1;
    if (chunk.topic.toLowerCase().includes(word)) score += 2;
  }

  return score;
}

export function findBestChunks(query: string, limit = 2): KnowledgeChunk[] {
  return [...knowledgeChunks]
    .map((chunk) => ({ chunk, score: scoreChunk(query, chunk) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.chunk);
}

export function buildLocalAnswer(query: string): { answer: string; sources: string[] } {
  const q = query.toLowerCase();

  if (/^(hi|hello|hey|good morning|good afternoon)\b/.test(q)) {
    return {
      answer:
        "Hello. I'm the SikaChain guide. I can help with the genesis producer program, Ghana launch strategy, governance, roadmap, and how Sika App fits in. What would you like to explore?",
      sources: [],
    };
  }

  const matches = findBestChunks(query, 2);

  if (matches.length === 0) {
    return {
      answer:
        "I can help with SikaChain positioning, the Genesis Producer Program (/genesis), Ghana launch (/ghana), producer requirements (/producers), governance, and Sika App. Try asking about any of those topics.",
      sources: [],
    };
  }

  const answer = matches.map((m) => m.text).join("\n\n");
  const sources = matches.filter((m) => m.link).map((m) => m.link!);

  return { answer, sources: Array.from(new Set(sources)) };
}

export function buildSystemPrompt(): string {
  return `You are the SikaChain concierge — a knowledgeable, concise guide for a blockchain settlement network built for mobile money in Ghana and Africa.

Rules:
- SikaChain is infrastructure; Sika App is the consumer mobile money product.
- Never pitch crypto speculation. Emphasize mobile money, merchants, agents, and institutional producers.
- Ghana is the first launch market.
- Keep answers under 120 words unless detail is requested.
- Mention relevant pages: /genesis, /producers, /apply, /ghana, /sika-app, /roadmap, /governance.

Context:
${knowledgeChunks.map((c) => `[${c.topic}] ${c.text}`).join("\n")}`;
}
