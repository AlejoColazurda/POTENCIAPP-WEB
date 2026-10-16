"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react"
import { ArrowLeft, Clock, Calendar, Sparkles, X, ChevronRight, MessageCircle, MoveRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog/types"
import { getCategoryInfo } from "@/lib/blog/categories"
import { SocialShareBar } from "./social-share-bar"
import { MarkdownContent } from "./markdown-content"
import { whatsAppUrl } from "@/lib/site"

interface ExpandedArticleModalProps {
  post: BlogPost | null
  onClose: () => void
}

export function ExpandedArticleModal({ post, onClose }: ExpandedArticleModalProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isCrumpled, setIsCrumpled] = useState(false)
  const articleContentRef = useRef<HTMLDivElement | null>(null)
  const isClosingRef = useRef(false)

  // Motion values for the paper crumple gesture
  const dragX = useMotionValue(0)

  // Smooth transforms linked to drag progress
  const paperScale = useTransform(dragX, [0, 200, 420], [1, 0.7, 0.15])
  const paperRotate = useTransform(dragX, [0, 200, 420], [0, 8, 28])
  const paperBorderRadius = useTransform(dragX, [0, 180, 420], ["0px", "32px", "120px"])
  const paperOpacity = useTransform(dragX, [0, 320, 440], [1, 0.9, 0])
  const paperSkew = useTransform(dragX, [0, 250, 420], [0, 6, 18])

  const triggerCrumpleAndClose = useCallback(() => {
    if (isClosingRef.current) return
    isClosingRef.current = true
    setIsCrumpled(true)

    // Trigger smooth crumple sound / vibration if supported
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([20, 40, 20])
      } catch {}
    }

    setTimeout(() => {
      onClose()
      setIsCrumpled(false)
      isClosingRef.current = false
    }, 380)
  }, [onClose])

  // Handle native iPhone/Safari back button & swipe
  // When modal opens, push history state so iPhone's native swipe-back closes the modal cleanly instead of leaving the website!
  useEffect(() => {
    if (!post) return

    // Lock body scroll to prevent iOS background scrolling
    const originalOverflow = document.body.style.overflow
    const originalTouchAction = document.body.style.touchAction
    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"

    // Push state for iOS Safari back swipe compatibility
    window.history.pushState({ potenciappModalOpen: true }, "")

    const handlePopState = () => {
      triggerCrumpleAndClose()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (window.history.state?.potenciappModalOpen) {
          window.history.back()
        } else {
          triggerCrumpleAndClose()
        }
      }
    }

    window.addEventListener("popstate", handlePopState)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.touchAction = originalTouchAction
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [post, triggerCrumpleAndClose])

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

  const handleManualClose = () => {
    if (window.history.state?.potenciappModalOpen) {
      window.history.back()
    } else {
      triggerCrumpleAndClose()
    }
  }

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    // If swiped right with sufficient offset or velocity
    if (info.offset.x > 90 || info.velocity.x > 300) {
      if (window.history.state?.potenciappModalOpen) {
        window.history.back()
      } else {
        triggerCrumpleAndClose()
      }
    } else {
      dragX.set(0)
    }
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-hidden bg-black/92 backdrop-blur-xl flex justify-center select-none"
        style={{ overscrollBehavior: "none", touchAction: "pan-y" }}
      >
        {/* SVG Filter for Paper Crumpling Displacement & Creases */}
        <svg className="hidden" aria-hidden="true">
          <defs>
            <filter id="paper-crumple-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Top Reading Progress Bar */}
        <div
          className="fixed top-0 left-0 h-1 bg-[#22F23A] z-50 transition-all duration-150 shadow-[0_0_12px_#22F23A]"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Gestural Crumple Container */}
        <motion.div
          layoutId={`card-container-${post.slug}`}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0.05, right: 0.75 }}
          onDragEnd={handleDragEnd}
          style={{
            x: dragX,
            scale: paperScale,
            rotateZ: paperRotate,
            skewX: paperSkew,
            borderRadius: paperBorderRadius,
            opacity: paperOpacity,
            filter: isCrumpled
              ? "url(#paper-crumple-filter) contrast(1.4) brightness(0.9)"
              : undefined,
            WebkitFilter: isCrumpled
              ? "contrast(1.4) brightness(0.9)"
              : undefined,
            touchAction: "pan-y",
          }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          className={`relative w-full max-w-4xl h-full bg-[#0A0A0A] border-x border-[#1A1A1A] flex flex-col shadow-2xl overflow-hidden origin-center transition-shadow duration-300 ${
            isCrumpled ? "shadow-[0_20px_60px_rgba(34,242,58,0.3)]" : ""
          }`}
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-40 flex items-center justify-between px-3 sm:px-8 py-3 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1A1A1A]">
            <button
              onClick={handleManualClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] text-xs font-semibold text-gray-200 hover:text-white transition group shrink-0"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#22F23A]" />
              <span>Volver</span>
            </button>

            {/* Gesture Cue Pill for Mobile & Desktop */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414] border border-[#222222] text-[11px] text-gray-300 font-medium cursor-grab active:cursor-grabbing">
              <span className="text-[#22F23A]">👉 Deslizá a la derecha</span>
              <span className="hidden sm:inline text-gray-400">para hacer un <strong>bollo de papel</strong></span>
              <MoveRight className="w-3.5 h-3.5 text-[#22F23A] animate-pulse" />
            </div>

            <button
              onClick={handleManualClose}
              className="p-2 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] text-gray-400 hover:text-white transition shrink-0"
              aria-label="Cerrar artículo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Article Body */}
          <div
            ref={articleContentRef}
            className="flex-1 overflow-y-auto px-4 sm:px-12 py-8 space-y-8 select-text"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
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

            {/* Rich Markdown Body Typography (Titles, Bold, Code, Lists, Quotes) */}
            <MarkdownContent content={post.content} />

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
                    onClick={handleManualClose}
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
