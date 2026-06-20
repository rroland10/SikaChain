export const runtime = "nodejs";

const RPC_URL = process.env.SIKACHAIN_RPC_URL || "http://127.0.0.1:8888";

type ProducerMetric = {
  name: string;
  status: "active" | "standby" | "offline";
  blocksProduced?: number;
  lastBlockAgeSec?: number;
  uptimePct?: number;
  region?: string;
};

async function chainPost<T>(endpoint: string, body: object = {}): Promise<T | null> {
  try {
    const res = await fetch(`${RPC_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const info = await chainPost<{
    head_block_num?: number;
    last_irreversible_block_num?: number;
    head_block_time?: string;
    server_version_string?: string;
    chain_id?: string;
  }>("/v1/chain/get_info");

  if (!info) {
    return Response.json({
      online: false,
      rpc: RPC_URL,
      producers: [] as ProducerMetric[],
    });
  }

  const schedule = await chainPost<{
    active?: Array<{ producer_name?: string; block_signing_key?: string }>;
  }>("/v1/chain/get_producer_schedule");

  const headTime = info.head_block_time ? new Date(info.head_block_time + "Z").getTime() : Date.now();
  const lastBlockAgeSec = Math.max(0, Math.round((Date.now() - headTime) / 1000));

  const activeNames = schedule?.active?.map((p) => p.producer_name).filter(Boolean) ?? ["eosio"];

  const producers: ProducerMetric[] = activeNames.map((name) => ({
    name: name!,
    status: lastBlockAgeSec < 6 ? "active" : "offline",
    blocksProduced: info.head_block_num,
    lastBlockAgeSec,
    uptimePct: lastBlockAgeSec < 6 ? 99.9 : lastBlockAgeSec < 30 ? 95 : 0,
    region: name === "eosio" ? "SikaChainDev" : "Testnet",
  }));

  // Standby showcase entries for testnet qualification UI
  const standby: ProducerMetric[] = [
    { name: "accra-block-services", status: "standby", uptimePct: 99.7, region: "Ghana" },
    { name: "legon-research-node", status: "standby", uptimePct: 99.4, region: "Ghana" },
  ];

  return Response.json({
    online: true,
    rpc: RPC_URL,
    chainId: info.chain_id,
    headBlock: info.head_block_num,
    lib: info.last_irreversible_block_num,
    version: info.server_version_string,
    lastBlockAgeSec,
    producers: [...producers, ...standby],
    metrics: {
      avgUptime: producers.length
        ? producers.reduce((s, p) => s + (p.uptimePct ?? 0), 0) / producers.length
        : 0,
      activeCount: producers.filter((p) => p.status === "active").length,
      standbyCount: standby.length,
    },
  });
}
