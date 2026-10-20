import type { ReactNode } from "react"

/**
 * Pass-through root layout required by next-intl + App Router.
 * `<html>` / `<body>` live in `app/[locale]/layout.tsx`. Without this file,
 * metadata routes (`/sitemap.xml`, `/robots.txt`) inherit the locale layout,
 * `params.locale` is missing, and `getTranslations` 500s.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
