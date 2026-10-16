import Link from "next/link"
import { notFound } from "next/navigation"
import { requireAdmin, type AdminPost } from "@/lib/admin"
import { serviceClient } from "@/lib/supabase"
import { AdminHeader } from "../../admin-header"
import { PostEditor } from "../post-editor"

export const dynamic = "force-dynamic"

const STATUS_LABEL: Record<AdminPost["status"], string> = {
  draft: "Borrador",
  published: "Publicado",
  discarded: "Descartado",
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { email, role } = await requireAdmin()
  const { id } = await params
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound()

  const { data } = await serviceClient().from("blog_posts").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()
  const post = data as AdminPost

  return (
    <>
      <AdminHeader email={email} role={role} />
      <main className="mx-auto max-w-[900px] px-4 py-10">
        <Link href={`/admin?tab=${post.status}`} className="text-sm text-gray-500 hover:text-brand-green">
          ← Todos los artículos
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${
              post.status === "published" ? "bg-brand-green/15 text-brand-green" : "bg-gray-800 text-gray-300"
            }`}
          >
            {STATUS_LABEL[post.status]}
          </span>
          {post.origin === "ai" && (
            <span className="rounded-full bg-gray-800 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gray-300">
              Generado por IA: revisalo antes de publicar
            </span>
          )}
          {post.status === "published" && (
            <a href={`/blog/${post.slug}`} target="_blank" className="text-sm text-gray-400 hover:text-brand-green">
              Ver publicado ↗
            </a>
          )}
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold">{post.title}</h1>

        {post.origin === "ai" && post.sources.length > 0 && (
          <details className="mt-4 rounded-lg border border-gray-800 p-4 text-sm">
            <summary className="cursor-pointer text-gray-300">Fuentes que usó la IA ({post.sources.length})</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-400">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="mt-8">
          {/* key: remount with fresh values after a save or status change */}
          <PostEditor key={post.updated_at} post={post} canDelete={role === "owner"} />
        </div>
      </main>
    </>
  )
}
