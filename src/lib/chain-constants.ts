/**
 * Public SikaChainDev constants — keep in sync with AntelopeOS/spring/sikachaindev/chain.json
 * Run: npm run sync:chain
 */
export const sikaChainDev = {
  "chainName": "SikaChainDev",
  "chainId": "9b2fde923758593c09517f77ed445a3962a9c938f44405dac43b4ccfebbfa57e",
  "rpcUrl": "http://127.0.0.1:8888",
  "walletUrl": "http://127.0.0.1:8899",
  "appUrl": "http://127.0.0.1:3003",
  "websiteUrl": "http://127.0.0.1:3004",
  "websitePort": 3004,
  "symbol": "SIKA",
  "tokenContract": "sika.token",
  "rexContract": "sika.rex",
  "systemContract": "eosio",
  "systemContractDisplayName": "SikaChain System",
  "producer": "eosio",
  "springVersion": "v1.3.0-dev-e6a99f68b67abc4d89fe716755b2e1394a4991f7",
  "launchMarket": "Ghana",
  "accounts": {
    "eosio": {
      "role": "SikaChain System (default Spring privileged account)",
      "publicKey": "PUB_K1_6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5BoDq63"
    },
    "sika": {
      "role": "SikaChain System (Phase 3 — Spring -DSIKACHAIN=ON)",
      "publicKey": "PUB_K1_6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5BoDq63"
    },
    "sikadev": {
      "role": "default dev account for contracts",
      "publicKey": "PUB_K1_4xLq2xvHoswe3nx452Y7odtkTrrSo26iNQhqHZAHBR833xUzDM"
    }
  },
  "wharfkit": {
    "chain": {
      "id": "9b2fde923758593c09517f77ed445a3962a9c938f44405dac43b4ccfebbfa57e",
      "url": "http://127.0.0.1:8888"
    }
  }
} as const;

export const devQuickStart = {
  startChain: `cd "../AntelopeOS/spring/sikachaindev/scripts"
./start-all.sh`,
  stopChain: `./stop-all.sh`,
  bootstrap: `./bootstrap-dev.sh`,
  deployContracts: `./deploy-sika-system.sh`,
  wireSikaApp: `cp "../Sika app/.env.sikachaindev" "../Sika app/.env.local"
cd "../Sika app" && npm run dev`,
  wireWebsite: `bash "../AntelopeOS/spring/sikachaindev/scripts/start-web.sh"`,
  cleosInfo: `cleos --url http://127.0.0.1:8888 get info`,
  wharfkitSnippet: `import { SessionKit } from "@wharfkit/session";

const kit = new SessionKit({
  appName: "SikaChain",
  chains: [{
    id: "9b2fde923758593c09517f77ed445a3962a9c938f44405dac43b4ccfebbfa57e",
    url: "http://127.0.0.1:8888",
  }],
});`,
} as const;
