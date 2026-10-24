import { SITE_URL } from "@/lib/site"

/**
 * IndexNow: tells Bing (and Yandex, Seznam, Naver…) that URLs changed, so they
 * recrawl now instead of on their own schedule. ChatGPT search relies on
 * Bing's index, so this is how new pages reach it fastest.
 *
 * The key is public by design: search engines verify ownership by fetching
 * /<key>.txt from this host (public/551949698d91586644ad5800a0d656e3.txt).
 * The same key is used by .github/workflows/indexnow.yml after each deploy.
 */
export const INDEXNOW_KEY = "551949698d91586644ad5800a0d656e3"

const ENDPOINT = "https://api.indexnow.org/indexnow"

/**
 * Submit absolute URLs of this site. Production only: preview and local runs
 * would announce URLs that do not exist on www.potenciapp.com. Never throws;
 * a failed ping must not break publishing.
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  if (process.env.VERCEL_ENV !== "production") return
  const host = new URL(SITE_URL).host
  const urlList = [...new Set(urls)].filter((u) => new URL(u).host === host)
  if (urlList.length === 0) return
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(10_000),
    })
    // 200 = accepted, 202 = accepted, key validation pending.
    if (res.status !== 200 && res.status !== 202) {
      console.error("IndexNow rejected submission", res.status, await res.text().catch(() => ""))
    }
  } catch (err) {
    console.error("IndexNow submission failed", err)
  }
}
