import "server-only";
import { createSign } from "node:crypto";
import { RankError } from "./errors";

// Google service-account sign-in using only fetch and node:crypto (no extra package).
// Signs a JWT with RS256 and exchanges it for a short-lived read-only access token.
// GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY are read on the server only and never logged.

const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

let cached: { token: string; expiresAt: number } | null = null;

function readPrivateKey(): string {
  let key = process.env.GSC_PRIVATE_KEY ?? "";
  key = key.trim().replace(/^"|"$/g, "").replace(/\\n/g, "\n");
  return key;
}

export async function getGoogleAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cached && cached.expiresAt - 60 > now) return cached.token;

  const email = process.env.GSC_CLIENT_EMAIL?.trim();
  const key = readPrivateKey();
  if (!email || !key) throw new RankError(503, "Search Console is not configured: GSC_CLIENT_EMAIL or GSC_PRIVATE_KEY is missing.");

  let assertion: string;
  try {
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
    const claims = Buffer.from(
      JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
    ).toString("base64url");
    const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(key).toString("base64url");
    assertion = `${header}.${claims}.${signature}`;
  } catch {
    throw new RankError(503, "Could not sign the Google service-account token. Check the format of GSC_PRIVATE_KEY.");
  }

  let res: Response;
  try {
    res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new RankError(502, "Could not reach Google to sign in.");
  }
  const body = (await res.json().catch(() => null)) as { access_token?: string; expires_in?: number; error?: string } | null;
  if (!res.ok || !body?.access_token) {
    throw new RankError(502, `Google sign-in failed${body?.error ? ` (${String(body.error).slice(0, 60)})` : ""}.`);
  }
  cached = { token: body.access_token, expiresAt: now + (typeof body.expires_in === "number" ? body.expires_in : 3000) };
  return cached.token;
}
