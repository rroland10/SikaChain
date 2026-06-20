import { sikaChainDev } from "@/lib/chain-constants";

export const chainConfig = {
  name: sikaChainDev.chainName,
  chainId: sikaChainDev.chainId,
  rpcUrl: process.env.SIKACHAIN_RPC_URL || sikaChainDev.rpcUrl,
  walletUrl: sikaChainDev.walletUrl,
  symbol: sikaChainDev.symbol,
  tokenContract: sikaChainDev.tokenContract,
  rexContract: sikaChainDev.rexContract,
  systemContract: sikaChainDev.systemContract,
  producer: sikaChainDev.producer,
  launchMarket: sikaChainDev.launchMarket,
} as const;

export type ChainInfo = {
  online: boolean;
  chainId?: string;
  headBlock?: number;
  lib?: number;
  headBlockTime?: string;
  producer?: string;
  version?: string;
};

export type BlockSummary = {
  blockNum: number;
  id: string;
  timestamp: string;
  producer: string;
  transactionCount: number;
  confirmed: boolean;
};

export type ActionSummary = {
  account: string;
  name: string;
  actors: string[];
};

export type TransactionSummary = {
  id: string;
  status: string;
  cpuUsageUs: number;
  netUsageWords: number;
  actions: ActionSummary[];
};

export type BlockDetail = BlockSummary & {
  previous: string;
  transactions: TransactionSummary[];
};

export type PaginatedBlocks = {
  blocks: BlockSummary[];
  headBlock: number;
  offset: number;
  limit: number;
  hasMore: boolean;
};

async function chainPost<T>(endpoint: string, body: object = {}): Promise<T | null> {
  try {
    const res = await fetch(`${chainConfig.rpcUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchChainInfo(): Promise<ChainInfo> {
  const info = await chainPost<{
    chain_id?: string;
    head_block_num?: number;
    last_irreversible_block_num?: number;
    head_block_time?: string;
    head_block_producer?: string;
    server_version_string?: string;
  }>("/v1/chain/get_info");

  if (!info) return { online: false };

  return {
    online: true,
    chainId: info.chain_id,
    headBlock: info.head_block_num,
    lib: info.last_irreversible_block_num,
    headBlockTime: info.head_block_time,
    producer: info.head_block_producer,
    version: info.server_version_string,
  };
}

type RawBlock = {
  id?: string;
  timestamp?: string;
  producer?: string;
  previous?: string;
  transactions?: RawTransaction[];
  block_num?: number;
};

type RawTransaction = {
  status?: string;
  cpu_usage_us?: number;
  net_usage_words?: number;
  trx?: string | { id?: string; transaction?: { actions?: RawAction[] } };
};

type RawAction = {
  account?: string;
  name?: string;
  authorization?: { actor?: string }[];
};

function parseActions(actions: RawAction[] | undefined): ActionSummary[] {
  return (actions ?? []).map((action) => ({
    account: action.account ?? "—",
    name: action.name ?? "—",
    actors: (action.authorization ?? [])
      .map((auth) => auth.actor)
      .filter((actor): actor is string => Boolean(actor)),
  }));
}

function parseTransactions(transactions: RawTransaction[] | undefined): TransactionSummary[] {
  return (transactions ?? []).flatMap((entry) => {
    if (typeof entry.trx === "string") {
      return [
        {
          id: entry.trx,
          status: entry.status ?? "unknown",
          cpuUsageUs: entry.cpu_usage_us ?? 0,
          netUsageWords: entry.net_usage_words ?? 0,
          actions: [],
        },
      ];
    }

    const id = entry.trx?.id;
    if (!id) return [];

    return [
      {
        id,
        status: entry.status ?? "unknown",
        cpuUsageUs: entry.cpu_usage_us ?? 0,
        netUsageWords: entry.net_usage_words ?? 0,
        actions: parseActions(entry.trx?.transaction?.actions),
      },
    ];
  });
}

async function fetchRawBlock(blockNum: number): Promise<RawBlock | null> {
  return chainPost<RawBlock>("/v1/chain/get_block", { block_num_or_id: blockNum });
}

function toBlockSummary(block: RawBlock, blockNum: number, lib?: number): BlockSummary | null {
  if (!block.id) return null;

  return {
    blockNum: block.block_num ?? blockNum,
    id: block.id,
    timestamp: block.timestamp ?? "",
    producer: block.producer ?? "—",
    transactionCount: block.transactions?.length ?? 0,
    confirmed: lib ? blockNum <= lib : false,
  };
}

export async function fetchBlock(blockNum: number): Promise<BlockSummary | null> {
  const block = await fetchRawBlock(blockNum);
  if (!block) return null;

  const info = await fetchChainInfo();
  return toBlockSummary(block, blockNum, info.lib);
}

export async function fetchBlockDetail(blockNum: number): Promise<BlockDetail | null> {
  const block = await fetchRawBlock(blockNum);
  if (!block?.id) return null;

  const info = await fetchChainInfo();
  const summary = toBlockSummary(block, blockNum, info.lib);
  if (!summary) return null;

  return {
    ...summary,
    previous: block.previous ?? "—",
    transactions: parseTransactions(block.transactions),
  };
}

export async function fetchRecentBlocks(limit = 8, offset = 0): Promise<PaginatedBlocks> {
  const info = await fetchChainInfo();
  if (!info.online || !info.headBlock) {
    return { blocks: [], headBlock: 0, offset, limit, hasMore: false };
  }

  const blocks: BlockSummary[] = [];
  for (let i = 0; i < limit; i++) {
    const num = info.headBlock - offset - i;
    if (num < 1) break;
    const block = await fetchBlock(num);
    if (block) blocks.push(block);
  }

  const nextNum = info.headBlock - offset - limit;
  return {
    blocks,
    headBlock: info.headBlock,
    offset,
    limit,
    hasMore: nextNum >= 1,
  };
}

export async function findTransaction(txId: string, searchDepth = 400): Promise<{
  transaction: TransactionSummary;
  blockNum: number;
} | null> {
  const normalized = txId.trim().toLowerCase();
  if (!normalized) return null;

  const history = await chainPost<{
    id?: string;
    trx?: { trx?: { id?: string; transaction?: { actions?: RawAction[] } } };
    block_num?: number;
  }>("/v1/history/get_transaction", { id: normalized });

  if (history?.id) {
    const trx = history.trx?.trx;
    return {
      blockNum: history.block_num ?? 0,
      transaction: {
        id: trx?.id ?? history.id,
        status: "executed",
        cpuUsageUs: 0,
        netUsageWords: 0,
        actions: parseActions(trx?.transaction?.actions),
      },
    };
  }

  const info = await fetchChainInfo();
  if (!info.online || !info.headBlock) return null;

  const depth = Math.min(searchDepth, info.headBlock);
  for (let i = 0; i < depth; i++) {
    const num = info.headBlock - i;
    const detail = await fetchBlockDetail(num);
    if (!detail) continue;

    const match = detail.transactions.find((tx) => tx.id.toLowerCase() === normalized);
    if (match) return { transaction: match, blockNum: num };
  }

  return null;
}
