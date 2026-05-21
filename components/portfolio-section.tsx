"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

type Item = {
  key: "p1" | "p2" | "p3" | "p4" | "p5" | "p6"
  image: string
  video: string
  tags: string[]
  size: "wide" | "tall" | "normal"
}

// Unsplash photos curated for tech/dashboard/product/team contexts.
// Stable hashes selected from Unsplash topics: business, technology, dashboard.
const ITEMS: Item[] = [
  {
    key: "p1",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop",
    video: "/videos/case-p1.mp4",
    tags: ["Next.js", "Shopify", "IA"],
    size: "wide",
  },
  {
    key: "p2",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
    video: "/videos/case-p2.mp4",
    tags: ["ERP", "n8n", "Postgres"],
    size: "normal",
  },
  {
    key: "p3",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop",
    video: "/videos/case-p3.mp4",
    tags: ["SaaS", "AWS", "Redis"],
    size: "normal",
  },
  {
    key: "p4",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop",
    video: "/videos/case-p4.mp4",
    tags: ["React Native", "WebRTC"],
    size: "tall",
  },
  {
    key: "p5",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
    video: "/videos/case-p5.mp4",
    tags: ["Logística", "APIs"],
    size: "wide",
  },
  {
    key: "p6",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=900&q=80&auto=format&fit=crop",
    video: "/videos/case-p6.mp4",
    tags: ["Fintech", "ML", "D3"],
    size: "normal",
  },
]

export function PortfolioSection() {
  const t = useTranslations("portfolio")

  return (
    <section
      id="portfolio"
      className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>
            <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100 max-w-[640px]">
              {t("title")}
            </h2>
          </div>
          <p className="text-base text-gray-300 max-w-[400px] md:text-right">{t("subtitle")}</p>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-6 auto-rows-[280px] md:auto-rows-[260px] lg:auto-rows-[300px]">
          {ITEMS.map((item, i) => (
            <ProjectCard
              key={item.key}
              item={item}
              index={i}
              title={t(`items.${item.key}.title`)}
              category={t(`items.${item.key}.category`)}
              desc={t(`items.${item.key}.desc`)}
              verCaso={t("verCaso")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  item,
  index,
  title,
  category,
  desc,
  verCaso,
}: {
  item: Item
  index: number
  title: string
  category: string
  desc: string
  verCaso: string
}) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hovered) {
      v.currentTime = 0
      v.playbackRate = 0.65
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [hovered])

  const span =
    item.size === "wide"
      ? "md:col-span-4 md:row-span-1"
      : item.size === "tall"
        ? "md:col-span-2 md:row-span-2"
        : "md:col-span-2 md:row-span-1"

  return (
    <Link
      ref={ref}
      href="#contacto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-brand-green/50 transition-all duration-500 ${span} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Fallback background — visible immediately while Unsplash image loads */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950"
      />

      {/* Image (poster) */}
      <Image
        src={item.image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={`object-cover transition-all duration-500 ${
          hovered ? "scale-105 opacity-0" : "opacity-100"
        }`}
      />

      {/* Remotion video on hover */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={item.video} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-950/80 backdrop-blur-sm border border-gray-800 font-mono text-[10px] uppercase tracking-wider text-gray-300">
            {category}
          </span>
          <span className="h-9 w-9 rounded-full bg-gray-950/80 backdrop-blur-sm border border-gray-800 flex items-center justify-center text-gray-300 group-hover:bg-brand-green group-hover:text-black group-hover:border-brand-green transition-all">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </div>

        <div>
          <h3 className="font-display font-bold text-2xl lg:text-3xl text-gray-100 tracking-tight">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-gray-300 leading-relaxed max-w-[420px] line-clamp-2">
            {desc}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider text-gray-500"
              >
                {tag}
                {tag !== item.tags[item.tags.length - 1] && (
                  <span className="ml-1.5 text-gray-700">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
