"use client"

import { useActionState, useMemo, useRef, useState, useTransition } from "react"
import { Marked } from "marked"
import type { AdminPost } from "@/lib/admin"
import { BLOG_CATEGORIES } from "@/lib/blog/categories"
import { deletePost, savePost, setStatus, uploadImage } from "../actions"

// Preview mirrors lib/blog.ts: raw HTML is shown escaped, never rendered.
const md = new Marked({
  renderer: {
    html({ text }) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    },
  },
})

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

/** Reads `---\nkey: value\n---\nbody` (same format as content/blog/*.md). */
function parseMarkdownFile(raw: string) {
  const text = raw.replace(/\r\n/g, "\n")
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) return { data: {} as Record<string, string>, body: text }
  const data: Record<string, string> = {}
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":")
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1")
  }
  return { data, body: m[2] }
}

const field =
  "mt-1 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-base text-gray-100 focus:border-brand-green focus:outline-none sm:text-sm"

export function PostEditor({ post, canDelete = false }: { post: AdminPost | null; canDelete?: boolean }) {
  const [state, action, saving] = useActionState(savePost, null)
  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(post))
  const [description, setDescription] = useState(post?.description ?? "")
  const [tag, setTag] = useState(post?.tag ?? "Ciberseguridad")
  const [body, setBody] = useState(post?.body_md ?? "")
  const [category, setCategory] = useState(post?.category ?? "security")
  const [cover, setCover] = useState(post?.cover_image ?? "")
  const [author, setAuthor] = useState(post?.author_name ?? "Equipo PotenciApp")
  const [view, setView] = useState<"edit" | "preview">("edit")
  const [uploadMsg, setUploadMsg] = useState<string | null>(null)
  const [busy, startTransition] = useTransition()
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const preview = useMemo(() => (view === "preview" ? md.parse(body, { async: false }) : ""), [view, body])
  const dirty =
    !post ||
    title !== post.title ||
    slug !== post.slug ||
    description !== post.description ||
    tag !== post.tag ||
    body !== post.body_md ||
    category !== post.category ||
    cover !== post.cover_image ||
    author !== post.author_name

  function insertAtCursor(text: string) {
    const el = bodyRef.current
    if (!el) return setBody((b) => `${b}\n${text}\n`)
    const start = el.selectionStart
    setBody((b) => `${b.slice(0, start)}${text}${b.slice(el.selectionEnd)}`)
  }

  async function onImage(file: File) {
    setUploadMsg("Subiendo imagen…")
    const form = new FormData()
    form.append("file", file)
    const res = await uploadImage(form)
    if (res.error) return setUploadMsg(res.error)
    insertAtCursor(`\n![${file.name.replace(/\.[^.]+$/, "")}](${res.url})\n`)
    setUploadMsg("Imagen insertada en el texto.")
  }

  async function onCover(file: File) {
    setUploadMsg("Subiendo portada…")
    const form = new FormData()
    form.append("file", file)
    const res = await uploadImage(form)
    if (res.error || !res.url) return setUploadMsg(res.error ?? "No se pudo subir.")
    setCover(res.url)
    setUploadMsg("Portada lista. Guardá para aplicarla.")
  }

  async function onMarkdownFile(file: File) {
    const { data, body: content } = parseMarkdownFile(await file.text())
    if (data.title) setTitle(data.title)
    if (data.description) setDescription(data.description)
    if (data.tag) setTag(data.tag)
    if (data.category && data.category in BLOG_CATEGORIES) setCategory(data.category)
    if (data.cover) setCover(data.cover)
    if (data.author) setAuthor(data.author)
    const newSlug = data.slug || slugify(data.title || file.name.replace(/\.md$/, ""))
    setSlug(newSlug)
    setSlugTouched(true)
    setBody(content.trim())
  }

  return (
    <div>
      <form action={action} className="space-y-5">
        {post && <input type="hidden" name="id" value={post.id} />}

        {!post && (
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-700 p-4 text-sm text-gray-300 hover:border-brand-green">
            <span>¿Ya lo tenés escrito? Subí un archivo .md y se completan los campos.</span>
            <input
              type="file"
              accept=".md,text/markdown"
              className="sr-only"
              onChange={(e) => e.target.files?.[0] && onMarkdownFile(e.target.files[0])}
            />
            <span className="ml-auto rounded-md border border-gray-700 px-3 py-1">Elegir archivo</span>
          </label>
        )}

        <label className="block">
          <span className="text-sm text-gray-300">Título</span>
          <input
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (!slugTouched) setSlug(slugify(e.target.value))
            }}
            required
            className={`${field} h-11`}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
          <label className="block">
            <span className="text-sm text-gray-300">URL</span>
            <div className="mt-1 flex items-center rounded-lg border border-gray-800 bg-gray-900 focus-within:border-brand-green">
              <span className="pl-3 text-sm text-gray-500">/blog/</span>
              <input
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value)
                  setSlugTouched(true)
                }}
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                className="h-11 min-w-0 flex-1 bg-transparent pr-3 text-base text-gray-100 focus:outline-none sm:text-sm"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Etiqueta</span>
            <input name="tag" value={tag} onChange={(e) => setTag(e.target.value)} className={`${field} h-11`} />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-gray-300">Categoría</span>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${field} h-11`}
            >
              {Object.values(BLOG_CATEGORIES).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Autor que se muestra</span>
            <input
              name="author_name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={60}
              className={`${field} h-11`}
            />
          </label>
        </div>

        <div className="block">
          <span className="text-sm text-gray-300">
            Imagen de portada <span className="text-gray-500">(vacía = imagen por defecto de la categoría)</span>
          </span>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" className="h-16 w-28 rounded-md border border-gray-800 object-cover" />
            )}
            <input
              name="cover_image"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="https://…"
              className={`${field} mt-0 h-11 min-w-[200px] flex-1`}
            />
            <label className="cursor-pointer rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-200 hover:border-brand-green">
              Subir
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => e.target.files?.[0] && onCover(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-gray-300">
            Descripción <span className="text-gray-500">({description.length}/200, aparece en Google)</span>
          </span>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            rows={2}
            className={`${field} py-2`}
          />
        </label>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-1 rounded-lg border border-gray-800 p-1 text-sm">
              {(["edit", "preview"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className={`rounded-md px-3 py-1 ${view === v ? "bg-gray-800 text-gray-100" : "text-gray-400"}`}
                >
                  {v === "edit" ? "Escribir" : "Vista previa"}
                </button>
              ))}
            </div>
            <label className="cursor-pointer rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:border-brand-green">
              Subir imagen
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(e) => e.target.files?.[0] && onImage(e.target.files[0])}
              />
            </label>
          </div>
          {uploadMsg && <p className="mt-2 text-xs text-gray-400">{uploadMsg}</p>}

          <textarea
            ref={bodyRef}
            name="body_md"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={24}
            className={`${field} mt-2 py-3 font-mono leading-relaxed ${view === "edit" ? "" : "hidden"}`}
            placeholder={"## Un subtítulo\n\nTexto del artículo en Markdown. **Negrita**, listas con - y links [así](https://…)."}
          />
          {view === "preview" && (
            <div
              className="blog-prose mt-2 min-h-[300px] rounded-lg border border-gray-800 bg-gray-950 p-6"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          )}
        </div>

        <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-gray-800 bg-gray-950/95 px-4 py-3 backdrop-blur">
          <button
            type="submit"
            disabled={saving}
            className="h-10 rounded-lg bg-brand-green px-5 text-sm font-semibold text-black hover:bg-green-hover disabled:opacity-50"
          >
            {saving ? "Guardando…" : post ? "Guardar cambios" : "Crear borrador"}
          </button>
          {state?.error && <span className="text-sm text-red-400">{state.error}</span>}
          {state?.ok && !dirty && <span className="text-sm text-brand-green">{state.ok}</span>}
          {post && dirty && <span className="text-sm text-yellow-300">Hay cambios sin guardar</span>}

          {post && (
            <div className="ml-auto flex flex-wrap gap-2">
              {post.status !== "published" && (
                <button
                  type="button"
                  disabled={busy || dirty}
                  title={dirty ? "Guardá los cambios antes de publicar" : undefined}
                  onClick={() => startTransition(() => setStatus(post.id, "published"))}
                  className="h-10 rounded-lg border border-brand-green px-4 text-sm font-semibold text-brand-green hover:bg-brand-green/10 disabled:opacity-40"
                >
                  Publicar
                </button>
              )}
              {post.status === "published" && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => startTransition(() => setStatus(post.id, "draft"))}
                  className="h-10 rounded-lg border border-gray-700 px-4 text-sm text-gray-200 disabled:opacity-40"
                >
                  Despublicar
                </button>
              )}
              {post.status === "draft" && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => startTransition(() => setStatus(post.id, "discarded"))}
                  className="h-10 rounded-lg border border-gray-700 px-4 text-sm text-gray-200 disabled:opacity-40"
                >
                  Descartar
                </button>
              )}
              {post.status === "discarded" && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => startTransition(() => setStatus(post.id, "draft"))}
                  className="h-10 rounded-lg border border-gray-700 px-4 text-sm text-gray-200 disabled:opacity-40"
                >
                  Volver a borrador
                </button>
              )}
              {canDelete && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    if (confirm("¿Eliminar este artículo para siempre? No se puede deshacer.")) {
                      startTransition(() => deletePost(post.id))
                    }
                  }}
                  className="h-10 rounded-lg px-3 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
