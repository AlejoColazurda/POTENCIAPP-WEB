import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { StatusPage, statusPrimary, statusSecondary } from "@/components/status-page"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"], display: "swap" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["500", "600", "700"], display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", weight: ["400", "500"], display: "swap" })

/**
 * Last-resort 404 for paths outside the localized site and the admin panel.
 * The root layout is a pass-through (html/body live in app/[locale]/layout),
 * so this page brings its own document. Spanish only: there is no locale here.
 */
export default function RootNotFound() {
  return (
    <html lang="es" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <StatusPage
          code="404"
          eyebrow="Página no encontrada"
          title="Esta página no existe (o se mudó)."
          body="Puede que el link esté mal escrito o que el contenido ya no esté."
          actions={
            <>
              <a href="/" className={statusPrimary}>
                Ir al inicio
              </a>
              <a href="/blog" className={statusSecondary}>
                Ver el blog
              </a>
            </>
          }
        />
      </body>
    </html>
  )
}
