import { StatusPage, statusPrimary, statusSecondary } from "@/components/status-page"
import { inter, spaceGrotesk, jetbrainsMono } from "./fonts/fonts"
import "./globals.css"

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
