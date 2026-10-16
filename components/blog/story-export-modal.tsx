"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, Download, Copy, Check, Sparkles, Instagram, Facebook } from "lucide-react"
import type { BlogPost } from "@/lib/blog/types"
import { SITE_URL } from "@/lib/site"

interface StoryExportModalProps {
  post: BlogPost
  isOpen: boolean
  onClose: () => void
}

const THEMES = [
  { id: "neon", name: "Verde Neón", accent: "#22F23A", bg: "#0A0A0A" },
  { id: "cyan", name: "Cyber Cyan", accent: "#3B9EFF", bg: "#060D17" },
  { id: "purple", name: "Deep Purple", accent: "#A855F7", bg: "#0D0617" },
  { id: "amber", name: "Amber Gold", accent: "#FFB020", bg: "#140D05" },
]

export function StoryExportModal({ post, isOpen, onClose }: StoryExportModalProps) {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedCaption, setCopiedCaption] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const drawStory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Standard Instagram / Facebook Story Resolution: 1080 x 1920
    const width = 1080
    const height = 1920
    canvas.width = width
    canvas.height = height

    // 1. Background fill
    ctx.fillStyle = selectedTheme.bg
    ctx.fillRect(0, 0, width, height)

    // 2. Load cover image or draw dynamic tech gradient
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = post.coverImage

    img.onload = () => {
      renderContent(img)
    }

    img.onerror = () => {
      // Fallback if CORS or network issue
      renderContent(null)
    }

    function renderContent(loadedImg: HTMLImageElement | null) {
      if (!ctx) return

      // Top image banner with fade
      if (loadedImg) {
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, width, 900)
        ctx.clip()
        // Draw image covering top portion
        const scale = Math.max(width / loadedImg.width, 900 / loadedImg.height)
        const x = (width - loadedImg.width * scale) / 2
        const y = 0
        ctx.drawImage(loadedImg, x, y, loadedImg.width * scale, loadedImg.height * scale)
        ctx.restore()

        // Gradient fade to dark background
        const grad = ctx.createLinearGradient(0, 400, 0, 950)
        grad.addColorStop(0, "rgba(10, 10, 10, 0)")
        grad.addColorStop(0.7, selectedTheme.bg)
        grad.addColorStop(1, selectedTheme.bg)
        ctx.fillStyle = grad
        ctx.fillRect(0, 400, width, 550)
      } else {
        const meshGrad = ctx.createRadialGradient(540, 450, 50, 540, 450, 700)
        meshGrad.addColorStop(0, "rgba(34, 242, 58, 0.25)")
        meshGrad.addColorStop(1, selectedTheme.bg)
        ctx.fillStyle = meshGrad
        ctx.fillRect(0, 0, width, 950)
      }

      // Top Bar: PotenciApp Logo / Badge
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)"
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
      ctx.lineWidth = 2
      drawRoundedRect(ctx, 80, 100, 360, 70, 35)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = selectedTheme.accent
      ctx.font = "bold 28px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText("⚡ POTENCIAPP LABS", 110, 146)

      // Top Right: Author badge
      if (post.author.isAgent) {
        ctx.fillStyle = "rgba(34, 242, 58, 0.15)"
        ctx.strokeStyle = selectedTheme.accent
        drawRoundedRect(ctx, 740, 100, 260, 70, 35)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = selectedTheme.accent
        ctx.font = "bold 24px sans-serif"
        ctx.fillText("🤖 AGENT IA", 780, 146)
      }

      // Category Pill
      const categoryY = 920
      ctx.fillStyle = selectedTheme.accent
      ctx.font = "bold 26px sans-serif"
      ctx.fillText(post.category.toUpperCase().replace("-", " "), 80, categoryY)

      // Main Headline / Title (Space Grotesk style)
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 58px sans-serif"
      const headline = post.storyCard?.headline || post.title
      wrapText(ctx, headline, 80, 1020, 920, 74)

      // Quote / Tagline
      const quoteY = 1350
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)"
      ctx.strokeStyle = selectedTheme.accent
      ctx.lineWidth = 3
      drawRoundedRect(ctx, 80, quoteY, 920, 260, 24)
      ctx.fill()
      ctx.stroke()

      // Glow accent bar inside quote
      ctx.fillStyle = selectedTheme.accent
      ctx.fillRect(110, quoteY + 40, 8, 180)

      ctx.fillStyle = "#E5E5E5"
      ctx.font = "italic 34px sans-serif"
      const quoteText = post.storyCard?.quote || post.summary
      wrapText(ctx, `"${quoteText}"`, 140, quoteY + 80, 820, 50)

      // Bottom Swipe Up / Link in Bio Call To Action
      const ctaY = 1680
      ctx.fillStyle = selectedTheme.accent
      drawRoundedRect(ctx, 80, ctaY, 920, 130, 65)
      ctx.fill()

      ctx.fillStyle = "#000000"
      ctx.font = "bold 38px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("👆 LINK EN BIO PARA LEER COMPLETO", 540, ctaY + 80)

      // Footer branding
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
      ctx.font = "24px sans-serif"
      ctx.fillText("www.potenciapp.com/blog", 540, 1860)
    }

    function drawRoundedRect(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) {
      c.beginPath()
      c.moveTo(x + r, y)
      c.arcTo(x + w, y, x + w, y + h, r)
      c.arcTo(x + w, y + h, x, y + h, r)
      c.arcTo(x, y + h, x, y, r)
      c.arcTo(x, y, x + w, y, r)
      c.closePath()
    }

    function wrapText(
      c: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) {
      const words = text.split(" ")
      let line = ""
      let currentY = y

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " "
        const metrics = c.measureText(testLine)
        const testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
          c.fillText(line, x, currentY)
          line = words[n] + " "
          currentY += lineHeight
        } else {
          line = testLine
        }
      }
      c.fillText(line, x, currentY)
    }
  }, [post, selectedTheme])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        drawStory()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen, drawStory])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    setIsGenerating(true)
    try {
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `potenciapp-story-${post.slug}.png`
      link.href = dataUrl
      link.click()
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyCaption = () => {
    const postUrl = `${SITE_URL}/${post.locale}/blog/${post.slug}`
    const caption = `🔥 NUEVO ARTÍCULO EN EL BLOG DE POTENCIAPP\n\n📌 "${post.title}"\n\n${post.summary}\n\n👉 Encontrá el link directo en nuestra biografía o visitá:\n${postUrl}\n\n${post.tags.map((t) => `#${t.replace(/\s+/g, "")}`).join(" ")} #PotenciApp #Software #Tech`

    navigator.clipboard.writeText(caption)
    setCopiedCaption(true)
    setTimeout(() => setCopiedCaption(false), 2500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700 transition"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Story Canvas Preview (9:16 Aspect Ratio) */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-950/80 border-b md:border-b-0 md:border-r border-gray-800">
          <div className="relative w-[270px] h-[480px] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-800 ring-1 ring-white/10 group">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover"
              style={{ width: "270px", height: "480px" }}
            />
            <div className="absolute bottom-2 left-2 right-2 text-center py-1 bg-black/60 backdrop-blur-sm rounded-lg text-[10px] text-gray-400 font-mono">
              Resolución HD: 1080 x 1920 (9:16)
            </div>
          </div>
        </div>

        {/* Configuration Controls & Export Actions */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-green-500/10 text-brand-green">
                <Sparkles className="w-4 h-4 text-[#22F23A]" />
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Generador de Historias
              </h3>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Exporta una creatividad optimizada en resolución 1080x1920 lista para publicar en <strong>Instagram Stories</strong> y <strong>Facebook Stories</strong>.
            </p>

            {/* Theme Selector */}
            <div className="mb-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                Estilo Visual & Acento
              </label>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition ${
                      selectedTheme.id === theme.id
                        ? "border-[#22F23A] bg-green-500/10 text-white"
                        : "border-gray-800 bg-gray-800/40 text-gray-400 hover:border-gray-700"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Social Sharing Hint */}
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-800 mb-6 space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Instagram className="w-4 h-4 text-pink-400" />
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Compatible con stickers de enlace directo en Instagram</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-800">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#22F23A] text-black font-semibold hover:bg-[#1AD832] transition shadow-lg shadow-green-500/20 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? "Generando..." : "Descargar Historia HD (PNG)"}</span>
            </button>

            <button
              onClick={handleCopyCaption}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 transition border border-gray-700 text-sm font-medium"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-4 h-4 text-[#22F23A]" />
                  <span className="text-[#22F23A]">¡Texto de Story copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Caption & Hashtags</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
