import Link from "next/link"
import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { FileSignature, ShieldCheck } from "lucide-react"

type Block = { h: string; p: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "legal" })
  return {
    title: `${t("termsTitle")} · PotenciApp`,
    robots: { index: false },
  }
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "legal" })
  const termsBlocks = (t.raw("termsBlocks") as Block[]) ?? []
  const privacyBlocks = (t.raw("privacyBlocks") as Block[]) ?? []

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-[760px] px-4 py-16 md:px-8 lg:py-24">
        <Link
          href="/"
          className="font-mono text-[12px] uppercase tracking-wider text-gray-500 transition-colors hover:text-brand-green"
        >
          {t("backHome")}
        </Link>

        <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.02em] lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
          {t("updated")}
        </p>

        <LegalSection
          id="terminos"
          icon={<FileSignature className="h-5 w-5" strokeWidth={2.2} />}
          title={t("termsTitle")}
          blocks={termsBlocks}
        />

        <LegalSection
          id="privacidad"
          icon={<ShieldCheck className="h-5 w-5" strokeWidth={2.2} />}
          title={t("privacyTitle")}
          blocks={privacyBlocks}
        />
      </div>
    </div>
  )
}

function LegalSection({
  id,
  icon,
  title,
  blocks,
}: {
  id: string
  icon: React.ReactNode
  title: string
  blocks: Block[]
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 text-brand-green">
          {icon}
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight lg:text-3xl">{title}</h2>
      </div>

      <div className="mt-6 space-y-6 border-l border-gray-800 pl-5">
        {blocks.map((block) => (
          <div key={block.h}>
            <h3 className="font-display text-base font-semibold text-gray-100">{block.h}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-gray-300">{block.p}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
