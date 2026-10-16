"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link } from "@/i18n/navigation"

export type NavItem = {
  label: string
  href: string
  id: string
}

/**
 * Desktop section nav: a single pill slides under the section currently in
 * view (scroll-spy) on the home page. When outside the home page (e.g. /blog),
 * items navigate directly to the respective section on the home page.
 */
export function SectionNav({
  items,
  isHomePage = true,
}: {
  items: NavItem[]
  isHomePage?: boolean
}) {
  const [active, setActive] = useState(-1)
  const listRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  // Scroll-spy: only active on the home page where section elements exist
  useEffect(() => {
    if (!isHomePage) {
      setActive(-1)
      setPill(null)
      return
    }

    const sections = items
      .map((it) => document.getElementById(it.id))
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
      setActive(id ? items.findIndex((it) => it.id === id) : -1)
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
  }, [items, isHomePage])

  useLayoutEffect(() => {
    if (!isHomePage || active === -1) {
      setPill(null)
      return
    }
    const li = listRef.current?.querySelectorAll("li")[active]
    setPill(li ? { left: li.offsetLeft, width: li.offsetWidth } : null)
  }, [active, items, isHomePage])

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHomePage) {
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: "smooth" })
        window.history.replaceState(null, "", `#${id}`)
      }
    }
  }

  return (
    <ul ref={listRef} className="relative flex items-center gap-1">
      {isHomePage && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 rounded-full bg-brand-green/10 ring-1 ring-brand-green/40 transition-[left,width,opacity] duration-300 ease-out"
          style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
        />
      )}
      {items.map((item, i) => (
        <li key={item.id} className="relative">
          {isHomePage ? (
            <a
              href={`#${item.id}`}
              onClick={(e) => handleItemClick(e, item.id)}
              aria-current={i === active ? "true" : undefined}
              className={`block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
                i === active ? "text-brand-green" : "text-gray-300 hover:text-gray-100"
              }`}
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={`/#${item.id}`}
              className="block rounded-full px-4 py-2 text-sm font-medium text-gray-300 hover:text-gray-100 hover:text-brand-green transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
