"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

type Item = { label: string; href: `#${string}` }

/**
 * Desktop section nav: a single pill slides under the section currently in
 * view (scroll-spy). Replaces ReactBits GooeyNav, whose contrast filter needs
 * a black backdrop + mix-blend-mode — inside the fixed header's stacking
 * context that backdrop painted as a black box over the hero.
 *
 * Plain <a> on purpose: hash-only next/link hrefs could append to an existing
 * hash (`/#faq#contacto`) instead of replacing it.
 */
export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(-1)
  const listRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  // Scroll-spy: the active section is the last one whose top crossed 40% of the viewport.
  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.href.slice(1)))
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
      // Past the end of the last section (contact/footer): nothing highlighted.
      const last = sections[sections.length - 1]
      if (idx === sections.length - 1 && last.getBoundingClientRect().bottom < line) idx = -1
      const id = idx === -1 ? null : sections[idx].id
      setActive(id ? items.findIndex((it) => it.href === `#${id}`) : -1)
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
      {items.map((item, i) => (
        <li key={item.href} className="relative">
          <a
            href={item.href}
            aria-current={i === active ? "true" : undefined}
            className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
              i === active ? "text-brand-green" : "text-gray-300 hover:text-gray-100"
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
