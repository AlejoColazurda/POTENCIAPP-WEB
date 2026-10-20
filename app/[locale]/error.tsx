"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { RotateCcw } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { StatusPage, statusPrimary, statusSecondary } from "@/components/status-page"

/** Unexpected error on any localized page: branded, with a retry. */
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("status")

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusPage
      code="500"
      eyebrow={t("errorEyebrow")}
      title={t("errorTitle")}
      body={t("errorBody")}
      actions={
        <>
          <button type="button" onClick={reset} className={statusPrimary}>
            <RotateCcw className="h-4 w-4" />
            {t("retry")}
          </button>
          <Link href="/" className={statusSecondary}>
            {t("home")}
          </Link>
        </>
      }
    />
  )
}
