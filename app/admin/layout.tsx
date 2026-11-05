import type { Metadata } from "next"
import { inter, spaceGrotesk, jetbrainsMono } from "../fonts/fonts"
import "../globals.css"

export const metadata: Metadata = {
  title: "Admin · PotenciApp",
  robots: { index: false, follow: false },
}

/**
 * Root layout for /admin: a separate, Spanish-only app outside the [locale]
 * tree (excluded from the next-intl middleware), with no site chrome.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-gray-950 font-sans text-gray-100 antialiased">{children}</body>
    </html>
  )
}
