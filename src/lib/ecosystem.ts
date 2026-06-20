import { sikaChainDev } from "@/lib/chain-constants";

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004";

export function getSikaAppUrl(): string {
  return process.env.NEXT_PUBLIC_SIKA_APP_URL || sikaChainDev.appUrl;
}

export function getSiteUrl(): string {
  return siteUrl();
}

export const ecosystemStack = [
  {
    layer: "L1",
    name: "Spring nodeos",
    description: "SikaChainDev — Savanna consensus, local P2P + RPC",
    href: "/developers",
    external: false,
    port: "8888",
  },
  {
    layer: "L2",
    name: "sika.* contracts",
    description: "System, token, REX, guard, rep, rules @ eosio",
    href: "/developers",
    external: false,
  },
  {
    layer: "L3",
    name: "WharfKit API",
    description: "Optional relay + transaction verification",
    href: "/developers",
    external: false,
    port: "4000",
  },
  {
    layer: "L4",
    name: "Sika App",
    description: "Consumer mobile money — WharfKit SessionKit",
    href: "/sika-app",
    external: false,
    port: "3003",
  },
  {
    layer: "GTM",
    name: "SikaChain site",
    description: "This site — genesis program, explorer, apply",
    href: "/",
    external: false,
    port: "3004",
  },
] as const;

export const ecosystemProjects = [
  { name: "Spring + sikachaindev", path: "../AntelopeOS/spring/sikachaindev", role: "Local chain" },
  { name: "SikaChain site", path: ".", role: "Marketing + producer onboarding (this repo)" },
  { name: "Sika App", path: "../Sika app", role: "Mobile money product UI" },
  { name: "System contracts", path: "../sikachain sys contract", role: "C++ WASM contracts" },
  { name: "WharfKit adapter", path: "../wharfkit adapter", role: "Production API relay" },
] as const;

export const localDevUrls = {
  chain: sikaChainDev.rpcUrl,
  wallet: sikaChainDev.walletUrl,
  sikaApp: getSikaAppUrl(),
  sikaChainSite: getSiteUrl(),
  explorer: `${getSiteUrl()}/explorer`,
  admin: `${getSiteUrl()}/admin`,
} as const;
