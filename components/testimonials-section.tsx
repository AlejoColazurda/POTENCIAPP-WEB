"use client"

import Image from "next/image"
import { Quote, Star } from "lucide-react"
import { useTranslations } from "next-intl"

const AVATARS = {
  t1: "https://i.pravatar.cc/200?img=68",
  t2: "https://i.pravatar.cc/200?img=47",
  t3: "https://i.pravatar.cc/200?img=33",
} as const

export function TestimonialsSection() {
  const t = useTranslations("testimonials")
  const keys = ["t1", "t2", "t3"] as const

  return (
    <section className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800 overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-brand-green/[0.04] blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
              {t("eyebrow")}
            </span>
          </span>
          <h2 className="mt-5 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.02em] text-gray-100 max-w-[720px] mx-auto">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keys.map((k) => (
            <TestimonialCard
              key={k}
              avatar={AVATARS[k]}
              name={t(`items.${k}.name`)}
              role={t(`items.${k}.role`)}
              quote={t(`items.${k}.quote`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  avatar,
  name,
  role,
  quote,
}: {
  avatar: string
  name: string
  role: string
  quote: string
}) {
  return (
    <figure className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 lg:p-8 hover:border-gray-700 transition-colors flex flex-col gap-6">
      <Quote className="h-7 w-7 text-brand-green opacity-60" strokeWidth={2.5} />

      <blockquote className="text-base lg:text-lg text-gray-100 leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-1 -mb-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-brand-green text-brand-green"
          />
        ))}
      </div>

      <figcaption className="flex items-center gap-3 pt-1 border-t border-gray-800">
        <Image
          src={avatar}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover border border-gray-800"
        />
        <div>
          <div className="font-display font-semibold text-gray-100 text-sm">{name}</div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500 mt-0.5">
            {role}
          </div>
        </div>
      </figcaption>
    </figure>
  )
}
