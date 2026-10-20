"use client"

import { useActionState, useState, useTransition } from "react"
import { deleteTranslation, saveTranslation, translateNow, type ActionState } from "../actions"

export type Translation = {
  locale: "en" | "pt" | "fr"
  title: string
  description: string
  body_md: string
  origin: "manual" | "ai"
  source_updated_at: string | null
  updated_at: string
}

const NAMES = { en: "Inglés", pt: "Portugués", fr: "Francés" } as const

const field =
  "mt-1 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-base text-gray-100 focus:border-brand-green focus:outline-none sm:text-sm"

function status(t: Translation | undefined, postUpdatedAt: string) {
  if (!t) return { label: "Sin traducir: se muestra en español", tone: "text-yellow-300" }
  // Saving the Spanish post bumps its updated_at past what this was made from.
  const stale = t.source_updated_at && new Date(t.source_updated_at) < new Date(postUpdatedAt)
  if (stale) return { label: "Desactualizada: el original cambió después", tone: "text-yellow-300" }
  return { label: t.origin === "manual" ? "Editada a mano" : "Traducida con IA", tone: "text-brand-green" }
}

function LocaleEditor({ postId, locale, t }: { postId: string; locale: Translation["locale"]; t?: Translation }) {
  const [state, action, saving] = useActionState(saveTranslation, null)

  return (
    <form action={action} className="mt-3 space-y-3">
      <input type="hidden" name="post_id" value={postId} />
      <input type="hidden" name="locale" value={locale} />
      <label className="block">
        <span className="text-xs text-gray-400">Título</span>
        <input name="title" defaultValue={t?.title} required className={`${field} h-10`} />
      </label>
      <label className="block">
        <span className="text-xs text-gray-400">Descripción</span>
        <textarea name="description" defaultValue={t?.description} maxLength={200} rows={2} className={`${field} py-2`} />
      </label>
      <label className="block">
        <span className="text-xs text-gray-400">Texto (Markdown)</span>
        <textarea name="body_md" defaultValue={t?.body_md} rows={14} className={`${field} py-2 font-mono text-xs`} />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="h-9 rounded-lg bg-brand-green px-4 text-sm font-semibold text-black disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar traducción"}
        </button>
        <span className="text-xs text-gray-500">Al guardar a mano, la IA ya no la pisa.</span>
        {state?.error && <span className="text-xs text-red-400">{state.error}</span>}
        {state?.ok && <span className="text-xs text-brand-green">{state.ok}</span>}
      </div>
    </form>
  )
}

export function TranslationsPanel({
  postId,
  postUpdatedAt,
  published,
  translations,
}: {
  postId: string
  postUpdatedAt: string
  published: boolean
  translations: Translation[]
}) {
  const [busy, startTransition] = useTransition()
  const [result, setResult] = useState<ActionState>(null)
  const [open, setOpen] = useState<Translation["locale"] | null>(null)
  const byLocale = Object.fromEntries(translations.map((t) => [t.locale, t])) as Partial<
    Record<Translation["locale"], Translation>
  >

  function run(force: boolean) {
    setResult(null)
    startTransition(async () => setResult(await translateNow(postId, force)))
  }

  return (
    <section className="mt-10 rounded-xl border border-gray-800 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Traducciones</h2>
          <p className="mt-1 text-sm text-gray-400">
            {published
              ? "Se traducen solas con IA al publicar. Revisalas y corregí lo que haga falta."
              : "Se traducen solas con IA cuando lo publiques. También podés hacerlo ahora."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => run(false)}
            className="h-9 rounded-lg border border-gray-700 px-3 text-sm text-gray-100 hover:border-brand-green disabled:opacity-50"
          >
            {busy ? "Traduciendo… (hasta 1 min)" : "Traducir con IA"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (confirm("¿Volver a traducir todo con IA? Se pisan también las traducciones editadas a mano.")) run(true)
            }}
            className="h-9 rounded-lg px-3 text-sm text-gray-400 hover:text-gray-100 disabled:opacity-50"
          >
            Rehacer todas
          </button>
        </div>
      </div>
      {result?.error && <p className="mt-3 text-sm text-red-400">{result.error}</p>}
      {result?.ok && <p className="mt-3 text-sm text-brand-green">{result.ok}</p>}

      <ul className="mt-4 divide-y divide-gray-800 border-y border-gray-800">
        {(Object.keys(NAMES) as Translation["locale"][]).map((locale) => {
          const t = byLocale[locale]
          const s = status(t, postUpdatedAt)
          return (
            <li key={locale} className="py-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <div>
                  <span className="text-gray-100">{NAMES[locale]}</span>
                  <span className={`ml-2 text-xs ${s.tone}`}>{s.label}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(open === locale ? null : locale)}
                    className="h-8 rounded-md border border-gray-700 px-3 text-xs text-gray-200"
                  >
                    {open === locale ? "Cerrar" : t ? "Revisar / editar" : "Escribir a mano"}
                  </button>
                  {t && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => startTransition(() => deleteTranslation(postId, locale))}
                      className="h-8 rounded-md px-3 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </div>
              {open === locale && (
                <LocaleEditor key={t?.updated_at ?? "new"} postId={postId} locale={locale} t={t} />
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
