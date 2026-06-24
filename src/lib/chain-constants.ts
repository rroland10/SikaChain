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
  "msigContract": "sika.msig",
  "hyperionUrl": "http://127.0.0.1:7001",
  "atomicassetsContract": "atomicassets",
  "systemContract": "sika",
  "systemContractDisplayName": "SikaChain System",
  "producer": "sika",
  "springVersion": "v1.3.0-dev-e6a99f68b67abc4d89fe716755b2e1394a4991f7",
  "launchMarket": "Ghana",
  "accounts": {
    "sika": {
      "role": "SikaChain System (privileged — Spring -DSIKACHAIN=ON)",
      "publicKey": "PUB_K1_6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5BoDq63"
    },
    "sikadev": {
      "role": "default dev account for contracts",
      "publicKey": "PUB_K1_4xLq2xvHoswe3nx452Y7odtkTrrSo26iNQhqHZAHBR833xUzDM"
    },
    "sikauser1": {
      "role": "peer dev wallet for send/receive tests",
      "publicKey": "PUB_K1_8MkCa2jtNRFVMUsayVEB8bCbTjyncPPzm5eU6nuxaHnCvgb9Md"
    },
    "sikauser2": {
      "role": "peer dev wallet for send/receive tests",
      "publicKey": "PUB_K1_7tuutwpe1yU7Nn5iyw7piwciVf3QNTHKpnqhQAyQjMRkG7nZ8V"
    },
    "sikamsig1": {
      "role": "2-of-3 linked active permission for business import E2E (owner key = sikadev)",
      "publicKey": "PUB_K1_4xLq2xvHoswe3nx452Y7odtkTrrSo26iNQhqHZAHBR833xUzDM"
    }
  },
  "wharfkit": {
    "appName": "Sika",
    "chain": {
      "id": "9b2fde923758593c09517f77ed445a3962a9c938f44405dac43b4ccfebbfa57e",
      "url": "http://127.0.0.1:8888",
      "name": "SikaChainDev"
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
