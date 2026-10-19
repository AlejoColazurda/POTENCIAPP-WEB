import type { Metadata } from "next"
import { Mail, Users } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { EquipoGrid } from "@/components/equipo-grid"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  equipoOgImageSrc,
  equipoPlateSrc,
  getPublicMembers,
} from "@/lib/equipo/get-public-members"
import { homeSectionHref } from "@/lib/nav"
import { CONTACT_EMAIL, whatsAppUrl } from "@/lib/site"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "equipo" })
  const canonical = locale === "es" ? "/equipo" : `/${locale}/equipo`
  const og = equipoOgImageSrc()
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical,
      languages: {
        es: "/equipo",
        en: "/en/equipo",
        pt: "/pt/equipo",
        fr: "/fr/equipo",
        "x-default": "/equipo",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      locale,
      siteName: "PotenciApp",
      images: [{ url: og, width: 1200, height: 630, alt: "PotenciApp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [og],
    },
  }
}

function EquipoCtas({
  primaryHref,
  waHref,
  primaryLabel,
  waLabel,
}: {
  primaryHref: string
  waHref: string
  primaryLabel: string
  waLabel: string
}) {
  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
      <a
        href={primaryHref}
        className="inline-flex h-12 min-h-11 w-full items-center justify-center rounded-lg bg-brand-green px-6 font-display text-base font-bold text-black transition-colors hover:bg-green-hover sm:w-auto"
      >
        {primaryLabel}
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-brand-green px-6 font-display text-base font-bold text-brand-green transition-colors hover:bg-brand-green/10 sm:w-auto"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {waLabel}
      </a>
    </div>
  )
}

export default async function EquipoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("equipo")
  const members = getPublicMembers()
  const empty = members.length === 0
  const plate = equipoPlateSrc()
  const proposalHref = homeSectionHref("/equipo", locale, "contacto")
  const waHref = whatsAppUrl(t("waGreeting"))

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-[#0A0A0A] pt-32 pb-16 lg:pt-40 lg:pb-20">
          {plate ? (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30 motion-reduce:opacity-25"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={plate}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="relative mx-auto max-w-[720px] px-4 md:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-gray-100 lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-300">{t("lead")}</p>
          </div>
        </section>

        <section className="bg-[#0A0A0A] pb-16 lg:pb-24">
          <div className="mx-auto max-w-[1280px] px-4 md:px-8">
            {empty ? (
              <Empty className="mx-auto max-w-[640px] border border-dashed border-gray-800 bg-[#111111]">
                <EmptyHeader className="max-w-lg">
                  <EmptyMedia variant="icon" className="bg-gray-950 text-brand-green">
                    <Users className="size-6" aria-hidden />
                  </EmptyMedia>
                  <EmptyTitle className="font-display text-xl text-gray-100">
                    {t("empty.title")}
                  </EmptyTitle>
                  <EmptyDescription className="text-gray-300">
                    {t("empty.body")}
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="max-w-md">
                  <EquipoCtas
                    primaryHref={proposalHref}
                    waHref={waHref}
                    primaryLabel={t("cta.primary")}
                    waLabel={t("cta.whatsapp")}
                  />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-gray-300 hover:text-brand-green"
                  >
                    <Mail className="h-4 w-4" />
                    {CONTACT_EMAIL}
                  </a>
                </EmptyContent>
              </Empty>
            ) : (
              <EquipoGrid members={members} />
            )}
          </div>
        </section>

        {!empty ? (
          <section className="border-t border-gray-800 bg-[#0A0A0A] py-16 lg:py-20">
            <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 px-4 text-center md:px-8">
              <EquipoCtas
                primaryHref={proposalHref}
                waHref={waHref}
                primaryLabel={t("cta.primary")}
                waLabel={t("cta.whatsapp")}
              />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-gray-300 hover:text-brand-green"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
