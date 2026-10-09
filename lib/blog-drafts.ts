import "server-only"
import { fileSlugs } from "@/lib/blog"
import { serviceClient } from "@/lib/supabase"

/**
 * AI draft pipeline for the blog. Reads news feeds, asks Gemini to pick the
 * topic most useful for Argentine shops/SMBs and write an ORIGINAL article
 * about it, and stores the result as a `draft`. Nothing here publishes: the
 * founder approves every post in /admin (Google treats unreviewed mass
 * AI content as "scaled content abuse").
 *
 * Feeds are used for topic ideas only; the prompt forbids copying text, and
 * every source the model used is stored and listed at the end of the article.
 */

export const FEEDS = [
  "https://www.welivesecurity.com/es/rss/feed/",
  "https://news.google.com/rss/search?q=estafas+comercios+Argentina&hl=es-419&gl=AR&ceid=AR:es-419",
  "https://news.google.com/rss/search?q=ciberseguridad+pymes&hl=es-419&gl=AR&ceid=AR:es-419",
  "https://news.google.com/rss/search?q=Mercado+Libre+vendedores&hl=es-419&gl=AR&ceid=AR:es-419",
  "https://news.google.com/rss/search?q=Mercado+Pago+fraude&hl=es-419&gl=AR&ceid=AR:es-419",
]

const MODEL = "gemini-3.6-flash"
const ITEMS_PER_FEED = 8
const MAX_AGE_DAYS = 14

type FeedItem = { title: string; url: string; summary: string; date: string }

function decode(s: string) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, " ") // entity-decoded markup, second pass
    .replace(/\s+/g, " ")
    .trim()
}

function tag(xml: string, name: string) {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
  return m ? decode(m[1]) : ""
}

export async function readFeed(url: string): Promise<FeedItem[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "PotenciAppBlogBot/1.0 (+https://www.potenciapp.com)" },
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    })
    if (!res.ok) return []
    const xml = await res.text()
    const cutoff = Date.now() - MAX_AGE_DAYS * 86_400_000
    return [...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/g)]
      .map((m) => m[0])
      .map((item) => ({
        title: tag(item, "title"),
        url: tag(item, "link"),
        summary: tag(item, "description").slice(0, 400),
        date: tag(item, "pubDate"),
      }))
      .filter((i) => i.title && /^https?:\/\//.test(i.url))
      .filter((i) => !i.date || Number.isNaN(Date.parse(i.date)) || Date.parse(i.date) >= cutoff)
      .slice(0, ITEMS_PER_FEED)
  } catch {
    return []
  }
}

type Draft = {
  slug: string
  title: string
  description: string
  tag: string
  body_md: string
  sources: { title: string; url: string }[]
}

const SYSTEM = `Sos el editor del blog de PotenciApp, una empresa argentina de desarrollo de software a medida, tiendas online, Mercado Libre, marketing digital y ciberseguridad.
Escribís para dueños de comercios y pymes argentinas, en español rioplatense con voseo, claro y sin tecnicismos.

TAREA
De la lista de noticias, elegí UN tema que sea útil y accionable para un comercio o pyme argentina (estafas, seguridad de cuentas, ventas online, Mercado Libre, Mercado Pago, tiendas online). Evitá vulnerabilidades técnicas de productos que un comercio no usa, y evitá los temas que ya están en el blog.
Escribí un artículo ORIGINAL sobre ese tema.

REGLAS
- No copies ni parafrasees de cerca ningún texto de las fuentes: usalas solo como punto de partida y explicá con tus palabras.
- No inventes datos, cifras, fechas, nombres de personas ni casos. Si un dato no está en las noticias, no lo pongas.
- No afirmes nada sobre clientes ni resultados de PotenciApp.
- Si nombrás menús o pasos de una app, que sean generales ("en la configuración de seguridad de tu cuenta"), salvo que estés seguro.
- Estructura en Markdown: 2 a 4 secciones con "## ", listas cuando ayuden, 500 a 900 palabras. Sin título "# " (va aparte).
- Cerrá con un párrafo corto que invite a consultar a PotenciApp, sin exagerar.
- slug: minúsculas, palabras separadas por guiones, sin acentos, máximo 60 caracteres.
- description: una oración de hasta 160 caracteres.
- tag: una o dos palabras (por ejemplo Estafas, Mercado Libre, E-commerce, Cuentas, Seguridad).
- sources: solo las noticias de la lista que realmente usaste, con su título y URL exactos.`

const SCHEMA = {
  type: "OBJECT",
  properties: {
    slug: { type: "STRING" },
    title: { type: "STRING" },
    description: { type: "STRING" },
    tag: { type: "STRING" },
    body_md: { type: "STRING" },
    sources: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { title: { type: "STRING" }, url: { type: "STRING" } },
        required: ["title", "url"],
      },
    },
  },
  required: ["slug", "title", "description", "tag", "body_md", "sources"],
}

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "")
}

export async function askGemini(items: FeedItem[], existingTitles: string[]): Promise<Draft> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error("GEMINI_API_KEY no está configurada")

  const prompt = `ARTÍCULOS QUE YA ESTÁN EN EL BLOG (no repitas el tema):
${existingTitles.map((t) => `- ${t}`).join("\n") || "- (ninguno)"}

NOTICIAS DISPONIBLES:
${items.map((i, n) => `${n + 1}. ${i.title}\n   URL: ${i.url}\n   Resumen: ${i.summary}`).join("\n")}`

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        // Thinking tokens count against this budget on Gemini 3.x.
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: SCHEMA,
      },
    }),
    signal: AbortSignal.timeout(90_000),
  })
  if (!res.ok) throw new Error(`Gemini respondió ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  const text: string =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? ""
  const draft = JSON.parse(text) as Draft

  // Only keep sources that were actually in the list we sent.
  const known = new Set(items.map((i) => i.url))
  draft.sources = (draft.sources ?? []).filter((s) => known.has(s.url))
  draft.slug = slugify(draft.slug || draft.title)
  if (!draft.slug || !draft.title || draft.body_md.length < 400) {
    throw new Error("Gemini devolvió un borrador incompleto")
  }
  return draft
}

function withSourcesSection(body: string, sources: Draft["sources"]) {
  if (sources.length === 0) return body.trim()
  const list = sources.map((s) => `- [${s.title.replace(/[[\]]/g, "")}](${s.url})`).join("\n")
  return `${body.trim()}\n\n## Fuentes\n\n${list}\n`
}

/** Creates up to `count` new drafts. Returns the created slugs. */
export async function generateDrafts(count = 1): Promise<string[]> {
  const db = serviceClient()

  const { data: rows, error } = await db.from("blog_posts").select("slug,title,sources")
  if (error) throw new Error(error.message)

  const takenSlugs = new Set([...fileSlugs(), ...(rows ?? []).map((r) => r.slug as string)])
  const usedUrls = new Set(
    (rows ?? []).flatMap((r) => ((r.sources as Draft["sources"]) ?? []).map((s) => s.url)),
  )
  const existingTitles = (rows ?? []).map((r) => r.title as string)

  const feeds = await Promise.all(FEEDS.map(readFeed))
  let items = feeds.flat().filter((i) => !usedUrls.has(i.url))
  if (items.length === 0) throw new Error("No hay noticias nuevas en las fuentes")

  const created: string[] = []
  for (let n = 0; n < count && items.length > 0; n++) {
    const draft = await askGemini(items, existingTitles)

    let slug = draft.slug
    for (let i = 2; takenSlugs.has(slug); i++) slug = `${draft.slug}-${i}`

    const { error: insertError } = await db.from("blog_posts").insert({
      slug,
      title: draft.title.trim(),
      description: draft.description.trim().slice(0, 200),
      tag: draft.tag.trim().slice(0, 40) || "Seguridad",
      body_md: withSourcesSection(draft.body_md, draft.sources),
      status: "draft",
      origin: "ai",
      sources: draft.sources,
    })
    if (insertError) throw new Error(insertError.message)

    created.push(slug)
    takenSlugs.add(slug)
    existingTitles.push(draft.title)
    const used = new Set(draft.sources.map((s) => s.url))
    items = items.filter((i) => !used.has(i.url))
  }
  return created
}
