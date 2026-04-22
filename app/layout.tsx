import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'POTENCIAPP | Desarrollo Web & E-commerce con IA',
  description: 'Creamos sistemas digitales de alto rendimiento que escalan tu negocio con automatización, datos e inteligencia aplicada.',

}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors theme="dark" position="top-center" />
        <Analytics />
      </body>
    </html>
  )
}
