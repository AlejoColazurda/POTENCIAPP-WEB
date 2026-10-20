import { getTranslations } from "next-intl/server"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { StatusPage, statusPrimary, statusSecondary } from "@/components/status-page"
import { whatsAppUrl } from "@/lib/site"

/** 404 for every localized route, including unknown paths (see [...rest]). */
export default async function LocaleNotFound() {
  const t = await getTranslations("status")

  return (
    <StatusPage
      code="404"
      eyebrow={t("notFoundEyebrow")}
      title={t("notFoundTitle")}
      body={t("notFoundBody")}
      actions={
        <>
          <Link href="/" className={statusPrimary}>
            {t("home")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/blog" className={statusSecondary}>
            {t("blog")}
          </Link>
          <a href={whatsAppUrl(t("waMessage"))} target="_blank" rel="noopener noreferrer" className={statusSecondary}>
            <MessageCircle className="h-4 w-4 text-[#22F23A]" />
            {t("contact")}
          </a>
        </>
      }
    />
  )
}
