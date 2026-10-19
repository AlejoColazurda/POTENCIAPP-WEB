"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link, usePathname } from "@/i18n/navigation"

type Item = { label: string; href: string }

function hashId(href: string) {
  const i = href.indexOf("#")
  return i === -1 ? null : href.slice(i + 1)
}

function isPagePath(href: string) {
  return !href.includes("#")
}

/**
 * Desktop section nav: a single pill slides under the section currently in
 * view (scroll-spy). Replaces ReactBits GooeyNav, whose contrast filter needs
 * a black backdrop + mix-blend-mode — inside the fixed header's stacking
 * context that backdrop painted as a black box over the hero.
 *
 * Hash hrefs stay plain <a> so they replace the hash instead of stacking
 * (`/#faq#contacto`). Page hrefs use next-intl Link for locale prefixes.
 */
export function SectionNav({ items }: { items: Item[] }) {
  const pathname = usePathname()
  const [active, setActive] = useState(-1)
  const listRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const sections = items
      .map((it) => {
        const id = hashId(it.href)
        return id ? document.getElementById(id) : null
      })
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let idx = -1
      sections.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) idx = i
      })
      const last = sections[sections.length - 1]
      if (idx === sections.length - 1 && last.getBoundingClientRect().bottom < line) idx = -1
      const id = idx === -1 ? null : sections[idx].id
      setActive(id ? items.findIndex((it) => hashId(it.href) === id) : -1)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  useLayoutEffect(() => {
    const li = listRef.current?.querySelectorAll("li")[active]
    setPill(li ? { left: li.offsetLeft, width: li.offsetWidth } : null)
  }, [active, items])

  return (
    <ul ref={listRef} className="relative flex items-center gap-1">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 rounded-full bg-brand-green/10 ring-1 ring-brand-green/40 transition-[left,width,opacity] duration-300 ease-out"
        style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
      />
      {items.map((item, i) => {
        const pageCurrent =
          isPagePath(item.href) && (pathname === item.href || pathname.startsWith(`${item.href}/`))
        const isCurrent = pageCurrent || i === active
        const className = `flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
          isCurrent ? "text-brand-green" : "text-gray-300 hover:text-gray-100"
        }`
        return (
          <li key={item.href} className="relative">
            {isPagePath(item.href) ? (
              <Link href={item.href} aria-current={pageCurrent ? "page" : undefined} className={className}>
                {item.label}
              </Link>
            ) : (
              <a href={item.href} aria-current={i === active ? "true" : undefined} className={className}>
                {item.label}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}
