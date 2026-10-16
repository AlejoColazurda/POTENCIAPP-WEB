import Link from "next/link"
import { requireAdmin, type AdminPost } from "@/lib/admin"
import { getAllPosts, fileSlugs } from "@/lib/blog"
import { serviceClient } from "@/lib/supabase"
import { AdminHeader } from "./admin-header"
import { GenerateButton, MonthlyButton } from "./generate-button"

export const dynamic = "force-dynamic"

const TABS = [
  { key: "draft", label: "Borradores" },
  { key: "published", label: "Publicados" },
  { key: "discarded", label: "Descartados" },
] as const

type TabKey = (typeof TABS)[number]["key"]

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { email, role } = await requireAdmin()
  const { tab: rawTab } = await searchParams
  const tab: TabKey = TABS.some((t) => t.key === rawTab) ? (rawTab as TabKey) : "draft"

  const { data, error } = await serviceClient()
    .from("blog_posts")
    .select("id,slug,title,description,tag,status,origin,published_at,created_at,updated_at")
    .order("updated_at", { ascending: false })
  const posts = (data ?? []) as AdminPost[]
  const counts = Object.fromEntries(TABS.map((t) => [t.key, posts.filter((p) => p.status === t.key).length]))
  const visible = posts.filter((p) => p.status === tab)

  // Articles committed as Markdown files: shown read-only, they are edited in the repo.
  const repoSlugs = new Set(fileSlugs())
  const repoPosts = (await getAllPosts()).filter((p) => repoSlugs.has(p.slug) && !posts.some((d) => d.slug === p.slug))

  return (
    <>
      <AdminHeader email={email} role={role} />
      <main className="mx-auto max-w-[1100px] px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Artículos del blog</h1>
            <p className="mt-1 text-sm text-gray-400">
              La IA deja un borrador lunes, miércoles y viernes, y el día 1 un resumen con las noticias del mes anterior. Nada se publica sin aprobación.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <GenerateButton />
            <MonthlyButton />
            <Link
              href="/admin/posts/new"
              className="inline-flex h-10 items-center rounded-lg bg-brand-green px-4 text-sm font-semibold text-black hover:bg-green-hover"
            >
              Nuevo artículo
            </Link>
          </div>
        </div>

        {error && <p className="mt-6 text-sm text-red-400">No se pudo leer la base de datos: {error.message}</p>}

        <nav className="mt-8 flex gap-1 border-b border-gray-800" aria-label="Estado">
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={`/admin?tab=${t.key}`}
              aria-current={t.key === tab ? "page" : undefined}
              className={`-mb-px border-b-2 px-4 py-2 text-sm ${
                t.key === tab ? "border-brand-green text-gray-100" : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {t.label} <span className="text-gray-500">({counts[t.key]})</span>
            </Link>
          ))}
        </nav>

        <ul className="mt-4 divide-y divide-gray-800">
          {visible.length === 0 && <li className="py-8 text-sm text-gray-500">No hay artículos en esta pestaña.</li>}
          {visible.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/posts/${p.id}`} className="block py-4 hover:bg-gray-900/50">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  <span className="text-brand-green">{p.tag}</span>
                  <span>·</span>
                  <span>{p.origin === "ai" ? "Generado por IA" : "Manual"}</span>
                  <span>·</span>
                  <span>Editado {new Date(p.updated_at).toLocaleDateString("es-AR")}</span>
                </div>
                <div className="mt-1 font-display text-lg font-semibold text-gray-100">{p.title}</div>
                <div className="mt-1 line-clamp-2 text-sm text-gray-400">{p.description}</div>
              </Link>
            </li>
          ))}
        </ul>

        {tab === "published" && repoPosts.length > 0 && (
          <section className="mt-10">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
              Publicados desde el repositorio (se editan en content/blog/)
            </h2>
            <ul className="mt-2 divide-y divide-gray-800">
              {repoPosts.map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="text-gray-300">{p.title}</span>
                  <a href={`/blog/${p.slug}`} target="_blank" className="shrink-0 text-gray-500 hover:text-brand-green">
                    Ver ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  )
}
