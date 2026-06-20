import { getStorageBackend } from "@/lib/storage";
import { fetchChainInfo } from "@/lib/chain-client";

export const runtime = "nodejs";

export async function GET() {
  const storage = getStorageBackend();
  const chain = await fetchChainInfo();

  return Response.json({
    ok: true,
    service: "sikachain-web",
    storage,
    email: Boolean(process.env.RESEND_API_KEY),
    admin: Boolean(process.env.ADMIN_TOKEN),
    chain: {
      configured: Boolean(process.env.SIKACHAIN_RPC_URL || storage === "local"),
      online: chain.online,
    },
    timestamp: new Date().toISOString(),
  });
}
