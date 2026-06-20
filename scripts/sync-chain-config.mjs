#!/usr/bin/env node
/**
 * Sync public chain constants from AntelopeOS/spring/sikachaindev/chain.json
 * Strips private keys — never commit secrets to the marketing site.
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chainJsonPath = path.resolve(__dirname, "../../AntelopeOS/spring/sikachaindev/chain.json");
const outputPath = path.resolve(__dirname, "../src/lib/chain-constants.ts");

const raw = JSON.parse(readFileSync(chainJsonPath, "utf8"));

const publicAccounts = Object.fromEntries(
  Object.entries(raw.accounts ?? {}).map(([name, account]) => [
    name,
    {
      role: account.role,
      ...(account.publicKey ? { publicKey: account.publicKey } : {}),
    },
  ]),
);

const config = {
  chainName: raw.chainName,
  chainId: raw.chainId,
  rpcUrl: raw.url,
  walletUrl: raw.walletUrl,
  appUrl: raw.appUrl,
  symbol: raw.symbol,
  tokenContract: raw.tokenContract,
  rexContract: raw.rexContract,
  systemContract: raw.systemContract,
  systemContractDisplayName: raw.systemContractDisplayName,
  producer: raw.producer,
  springVersion: raw.springVersion,
  launchMarket: "Ghana",
  accounts: publicAccounts,
  wharfkit: raw.wharfkit,
};

const wharfkitSnippet = `import { SessionKit } from "@wharfkit/session";

const kit = new SessionKit({
  appName: "SikaChain",
  chains: [{
    id: "${config.chainId}",
    url: "${config.rpcUrl}",
  }],
});`;

const content = `/**
 * Public SikaChainDev constants — keep in sync with AntelopeOS/spring/sikachaindev/chain.json
 * Run: npm run sync:chain
 */
export const sikaChainDev = ${JSON.stringify(config, null, 2)} as const;

export const devQuickStart = {
  startChain: \`cd "../AntelopeOS/spring/sikachaindev/scripts"
./start-all.sh\`,
  stopChain: \`./stop-all.sh\`,
  bootstrap: \`./bootstrap-dev.sh\`,
  deployContracts: \`./deploy-sika-system.sh\`,
  wireSikaApp: \`cp "../Sika app/.env.sikachaindev" "../Sika app/.env.local"
cd "../Sika app" && npm run dev\`,
  wireWebsite: \`cp .env.example .env
npm run dev   # http://localhost:3004\`,
  cleosInfo: \`cleos --url ${config.rpcUrl} get info\`,
  wharfkitSnippet: \`${wharfkitSnippet.replace(/`/g, "\\`")}\`,
} as const;
`;

writeFileSync(outputPath, content, "utf8");
console.log("Updated", outputPath);
