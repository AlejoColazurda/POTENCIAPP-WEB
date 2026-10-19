import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { EquipoMedia } from "@/components/equipo-media"
import { getPublicMembers } from "@/lib/equipo/get-public-members"

/**
 * Home teaser. Empty roster → text only, no placeholder avatars.
 * 1–4 public members → those faces plus a link. Never padded with fakes.
 */
export async function EquipoTeaser() {
  const t = await getTranslations("equipo")
  const members = getPublicMembers().slice(0, 4)
  const empty = members.length === 0

  return (
    <section className="relative border-t border-gray-800 bg-[#0A0A0A] py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="max-w-[640px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
              {t("teaser.eyebrow")}
            </span>
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-gray-100 sm:text-4xl">
            {t("teaser.title")}
          </h2>
        </div>

        <Link
          href="/equipo"
          className="inline-flex h-12 min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-brand-green px-5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/10 sm:w-auto"
        >
          {empty ? t("teaser.emptyCta") : t("teaser.cta")}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>

      {empty ? null : (
        <ul className="mx-auto mt-10 flex max-w-[1280px] flex-wrap gap-4 px-4 md:px-8">
          {members.map((member) => (
            <li key={member.id} className="flex items-center gap-3">
              <EquipoMedia member={member} variant="teaser" />
              <span className="font-display text-sm font-semibold text-gray-100">{member.name}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
