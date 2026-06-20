import {
  fetchChainInfo,
  fetchRecentBlocks,
  fetchBlock,
  fetchBlockDetail,
  findTransaction,
} from "@/lib/chain-client";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blockParam = searchParams.get("block");
  const txParam = searchParams.get("tx");
  const detail = searchParams.get("detail") === "1";
  const offset = Math.max(0, parseInt(searchParams.get("offset") ?? "0", 10) || 0);
  const limit = Math.min(25, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10) || 10));

  if (txParam) {
    const result = await findTransaction(txParam);
    if (!result) return Response.json({ error: "Transaction not found" }, { status: 404 });
    return Response.json(result);
  }

  if (blockParam) {
    const num = parseInt(blockParam, 10);
    if (Number.isNaN(num)) {
      return Response.json({ error: "Invalid block number" }, { status: 400 });
    }

    if (detail) {
      const block = await fetchBlockDetail(num);
      if (!block) return Response.json({ error: "Block not found" }, { status: 404 });
      return Response.json({ block });
    }

    const block = await fetchBlock(num);
    if (!block) return Response.json({ error: "Block not found" }, { status: 404 });
    return Response.json({ block });
  }

  const [info, page] = await Promise.all([fetchChainInfo(), fetchRecentBlocks(limit, offset)]);

  return Response.json({ ...info, ...page });
}
