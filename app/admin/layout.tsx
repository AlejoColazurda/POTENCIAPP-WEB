import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"], display: "swap" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["500", "600", "700"], display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", weight: ["400", "500"], display: "swap" })

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
