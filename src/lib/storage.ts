import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";

export type StorageBackend = "local" | "blob";

const LOCAL_ROOT = path.join(process.cwd(), "data");
const APPLICATIONS_PREFIX = "applications/";
const PROMOTED_PATH = "showcase/promoted.json";

export function getStorageBackend(): StorageBackend {
  return process.env.BLOB_READ_WRITE_TOKEN ? "blob" : "local";
}

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  return token;
}

async function readBlobJson<T>(pathname: string): Promise<T | null> {
  const token = blobToken();
  const { blobs } = await list({ prefix: pathname, token });
  const match = blobs.find((blob) => blob.pathname === pathname);
  if (!match) return null;

  const res = await fetch(match.url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

async function writeBlobJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "private",
    addRandomSuffix: false,
    token: blobToken(),
    contentType: "application/json",
  });
}

async function listBlobApplicationIds(): Promise<string[]> {
  const token = blobToken();
  const { blobs } = await list({ prefix: APPLICATIONS_PREFIX, token });
  return blobs
    .filter((blob) => blob.pathname.endsWith(".json"))
    .map((blob) => blob.pathname.replace(APPLICATIONS_PREFIX, "").replace(/\.json$/, ""));
}

export async function saveJsonObject(pathname: string, data: unknown): Promise<void> {
  if (getStorageBackend() === "blob") {
    await writeBlobJson(pathname, data);
    return;
  }

  const filePath = path.join(LOCAL_ROOT, pathname);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function readJsonObject<T>(pathname: string): Promise<T | null> {
  if (getStorageBackend() === "blob") {
    return readBlobJson<T>(pathname);
  }

  try {
    const raw = await readFile(path.join(LOCAL_ROOT, pathname), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveApplication<T extends object>(id: string, data: T): Promise<void> {
  await saveJsonObject(`${APPLICATIONS_PREFIX}${id}.json`, data);
}

export async function readApplication<T extends object>(id: string): Promise<T | null> {
  return readJsonObject<T>(`${APPLICATIONS_PREFIX}${id}.json`);
}

export async function listApplicationIds(): Promise<string[]> {
  if (getStorageBackend() === "blob") {
    return listBlobApplicationIds();
  }

  try {
    const dir = path.join(LOCAL_ROOT, APPLICATIONS_PREFIX);
    const files = await readdir(dir);
    return files.filter((file) => file.endsWith(".json")).map((file) => file.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}

export async function readPromotedJson<T>(): Promise<T[]> {
  const data = await readJsonObject<T[]>(PROMOTED_PATH);
  return data ?? [];
}

export async function writePromotedJson<T>(candidates: T[]): Promise<void> {
  await saveJsonObject(PROMOTED_PATH, candidates);
}
