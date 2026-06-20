export const runtime = "nodejs";

const RPC_URL = process.env.SIKACHAIN_RPC_URL || "http://127.0.0.1:8888";

export async function GET() {
  try {
    const response = await fetch(`${RPC_URL}/v1/chain/get_info`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      return Response.json({ online: false, rpc: RPC_URL });
    }

    const info = (await response.json()) as {
      chain_id?: string;
      head_block_num?: number;
      last_irreversible_block_num?: number;
      server_version_string?: string;
    };

    return Response.json({
      online: true,
      rpc: RPC_URL,
      chainId: info.chain_id,
      headBlock: info.head_block_num,
      lib: info.last_irreversible_block_num,
      version: info.server_version_string,
    });
  } catch {
    return Response.json({ online: false, rpc: RPC_URL });
  }
}
