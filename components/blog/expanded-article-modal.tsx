"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react"
import { ArrowLeft, Clock, Calendar, Sparkles, X, ChevronRight, MessageCircle } from "lucide-react"
import type { BlogPost } from "@/lib/blog/types"
import { getCategoryInfo } from "@/lib/blog/categories"
import { SocialShareBar } from "./social-share-bar"
import { whatsAppUrl } from "@/lib/site"

interface ExpandedArticleModalProps {
  post: BlogPost | null
  onClose: () => void
}

export function ExpandedArticleModal({ post, onClose }: ExpandedArticleModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isCrumpled, setIsCrumpled] = useState(false)
  const articleContentRef = useRef<HTMLDivElement | null>(null)

  // Motion values for the "Bollo de papel" (crumpled paper) gesture
  const dragX = useMotionValue(0)

  // Map drag distance (0px -> 450px) to paper crumple transformations
  const paperScale = useTransform(dragX, [0, 250, 450], [1, 0.65, 0.15])
  const paperRotate = useTransform(dragX, [0, 250, 450], [0, 12, 35])
  const paperBorderRadius = useTransform(dragX, [0, 200, 450], ["0px", "40px", "140px"])
  const paperOpacity = useTransform(dragX, [0, 350, 480], [1, 0.9, 0])
  const paperSqueezeX = useTransform(dragX, [0, 300, 450], ["0%", "-8%", "-25%"])

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleContentRef.current) return
      const el = articleContentRef.current
      const total = el.scrollHeight - el.clientHeight
      if (total <= 0) return
      const current = el.scrollTop
      setScrollProgress(Math.min(100, Math.max(0, (current / total) * 100)))
    }

    const container = articleContentRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [post])

  if (!post) return null

  const categoryInfo = getCategoryInfo(post.category)

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    // If swiped right past 120px or with sufficient velocity, trigger crumple exit
    if (info.offset.x > 120 || info.velocity.x > 350) {
      setIsCrumpled(true)
      setTimeout(() => {
        setIsCrumpled(false)
        onClose()
      }, 350)
    } else {
      dragX.set(0)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-xl flex justify-center">
        {/* SVG Filter for Paper Crumpling Displacement & Texture */}
        <svg className="hidden">
          <defs>
            <filter id="paper-crumple-filter">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Top Reading Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1 bg-[#22F23A] z-50 transition-all duration-150 shadow-[0_0_10px_#22F23A]"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Gestural Crumple Container */}
        <motion.div
          layoutId={`card-container-${post.slug}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0.05, right: 0.8 }}
          onDragEnd={handleDragEnd}
          style={{
            x: dragX,
            scale: paperScale,
            rotate: paperRotate,
            borderRadius: paperBorderRadius,
            opacity: paperOpacity,
            translateX: paperSqueezeX,
            filter: isCrumpled ? "url(#paper-crumple-filter) contrast(1.5) brightness(0.85)" : undefined,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-4xl h-full bg-[#0A0A0A] border-x border-[#1A1A1A] flex flex-col shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing origin-center"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1A1A1A]">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] text-xs font-semibold text-gray-200 hover:text-white transition group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#22F23A]" />
              <span>Volver al Blog</span>
            </button>

            {/* Gesture Hint Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-[11px] text-gray-400">
              <span>👉 Desliza a la derecha para hacer un <strong>bollo de papel</strong> y salir</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] text-gray-400 hover:text-white transition"
              aria-label="Cerrar artículo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Article Body */}
          <div
            ref={articleContentRef}
            className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 space-y-8 select-text"
          >
            {/* Category & Metadata */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: `${categoryInfo.color}15`,
                  color: categoryInfo.color,
                  borderColor: `${categoryInfo.color}40`,
                }}
              >
                {categoryInfo.label}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>{post.readingTime} de lectura</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              {post.author.isAgent && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#22F23A]/10 text-[#22F23A] border border-[#22F23A]/30">
                  <Sparkles className="w-3 h-3" />
                  <span>Publicado por Agente Autónomo</span>
                </span>
              )}
            </div>

            {/* Article Title */}
            <motion.h1
              layoutId={`card-title-${post.slug}`}
              className="text-2xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Author Profile Card */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#22F23A]/40"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{post.author.name}</span>
                  {post.author.handle && (
                    <span className="text-xs text-gray-400">{post.author.handle}</span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{post.author.role}</span>
              </div>
            </div>

            {/* Hero Cover Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#1A1A1A] shadow-2xl">
              <motion.img
                layoutId={`card-image-${post.slug}`}
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Social Republication Bar */}
            <SocialShareBar post={post} />

            {/* Summary Callout Box */}
            <div className="p-5 rounded-2xl bg-[#111111] border-l-4 border-l-[#22F23A] border-y border-r border-[#1A1A1A] text-gray-300 font-medium leading-relaxed italic">
              {post.summary}
            </div>

            {/* Main Markdown Body Content */}
            <div className="prose prose-invert prose-green max-w-none space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl sm:text-3xl font-bold text-white font-display pt-4 border-b border-[#1A1A1A] pb-2"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  )
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="text-xl sm:text-2xl font-bold text-white font-display pt-2 text-[#22F23A]"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  )
                }
                if (paragraph.startsWith("> ")) {
                  return (
                    <blockquote
                      key={index}
                      className="p-4 rounded-xl bg-[#111111] border-l-4 border-[#22F23A] text-gray-200 italic my-4"
                    >
                      {paragraph.replace("> ", "")}
                    </blockquote>
                  )
                }
                if (paragraph.startsWith("```")) {
                  const cleaned = paragraph.replace(/```[a-z]*\n?/g, "")
                  return (
                    <pre
                      key={index}
                      className="p-4 rounded-xl bg-[#080808] border border-[#1A1A1A] text-xs sm:text-sm font-mono text-green-400 overflow-x-auto shadow-inner"
                    >
                      <code>{cleaned}</code>
                    </pre>
                  )
                }
                return (
                  <p key={index} className="text-gray-300">
                    {paragraph}
                  </p>
                )
              })}
            </div>

            {/* Tags Pill List */}
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[#1A1A1A]">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">
                Temas:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#111111] text-gray-300 border border-[#1A1A1A]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom Social Republication Bar & Story Generator */}
            <div className="pt-2">
              <SocialShareBar post={post} />
            </div>

            {/* Conversion CTA to PotenciApp */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#111111] via-[#0E0E0E] to-[#0A0A0A] border border-[#22F23A]/30 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#22F23A]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#22F23A]/10 text-[#22F23A] border border-[#22F23A]/30">
                  ⚡ SOFTWARE CON CONTRATO Y GARANTÍA
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white font-display">
                  ¿Querés implementar esta tecnología en tu empresa?
                </h3>
                <p className="text-sm text-gray-400 max-w-xl">
                  En PotenciApp desarrollamos aplicaciones móviles, sistemas a medida y soluciones de IA con alcance cerrado, contrato firmado y 90 días de garantía.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={whatsAppUrl(`Hola PotenciApp, leí el artículo "${post.title}" y quiero consultar por un proyecto.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22F23A] text-black font-bold hover:bg-[#1AD832] transition shadow-lg shadow-green-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hablar por WhatsApp</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] text-sm font-semibold text-gray-200 transition"
                  >
                    <span>Seguir explorando el blog</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
