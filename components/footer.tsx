"use client"

import Link from "next/link"
import { Linkedin, Instagram, Github, Mail, MapPin } from "lucide-react"

const footerLinks = {
  servicios: [
    { label: "Desarrollo E-commerce", href: "#servicios" },
    { label: "IA & Automatización", href: "#servicios" },
    { label: "Desarrollo Web", href: "#servicios" },
    { label: "Consultoría", href: "#" },
  ],
  empresa: [
    { label: "Casos de Éxito", href: "#casos" },
    { label: "Proceso", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  legal: [
    { label: "Términos", href: "#" },
    { label: "Privacidad", href: "#" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:contacto@potenciapp.com", label: "Email" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-card/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="relative h-8 w-8 rounded-lg bg-[#7CFF3A] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(124,255,58,0.5)] transition-shadow duration-300">
                  <span className="text-background font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  POTENCIAPP
                </span>
              </Link>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
                Transformamos ideas en sistemas digitales de alto rendimiento. Desarrollo web, e-commerce e inteligencia artificial aplicada.
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-[#7CFF3A]" />
                <span>Argentina, Buenos Aires</span>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Servicios
              </h4>
              <ul className="space-y-3">
                {footerLinks.servicios.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#7CFF3A] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Empresa
              </h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#7CFF3A] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Legal */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Conectar
              </h4>
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-[#7CFF3A]/20 hover:text-[#7CFF3A] transition-all duration-200"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground hover:text-[#7CFF3A] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} POTENCIAPP. Todos los derechos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Hecho por POTENCIAPP{" "}
              <span className="text-[#7CFF3A]">◆</span>
              {" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
