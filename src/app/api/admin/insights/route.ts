import { verifyAdminToken } from "@/lib/applications";
import {
  createInsight,
  deleteInsight,
  listAllInsights,
  updateInsight,
} from "@/lib/cms/insights-store";
import type { CreateInsightInput, UpdateInsightInput } from "@/lib/cms/types";

export const runtime = "nodejs";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  const posts = await listAllInsights();
  return Response.json({ posts });
}

export async function POST(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  try {
    const body = (await request.json()) as CreateInsightInput;
    if (!body.title?.trim()) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const post = await createInsight(body);
    return Response.json({ post, message: "Insight created as draft" }, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  try {
    const body = (await request.json()) as { id: string } & UpdateInsightInput;
    if (!body.id) {
      return Response.json({ error: "id is required" }, { status: 400 });
    }

    const { id, ...patch } = body;
    const post = await updateInsight(id, patch);

    if (!post) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({
      post,
      message: post.status === "published" ? "Insight published" : "Insight saved",
    });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminToken(request)) return unauthorized();

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ error: "id query param is required" }, { status: 400 });
  }

  const removed = await deleteInsight(id);
  if (!removed) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ message: "Insight deleted" });
}
