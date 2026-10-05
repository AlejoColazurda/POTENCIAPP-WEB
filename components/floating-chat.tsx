"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUp, Sparkles, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { BrandMark } from "@/components/brand"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { OPEN_CHAT_EVENT, whatsAppUrl } from "@/lib/site"

type Message = { role: "user" | "assistant"; content: string }

/**
 * Floating assistant, bottom-right on every page. Backed by /api/chat (Gemini);
 * if the API has no key or errors, the thread degrades to a WhatsApp handoff
 * instead of a dead input.
 *
 * Below `sm` the panel is a full-screen sheet sized to the *visual* viewport,
 * so the input stays above the on-screen keyboard; from `sm` up it is a
 * floating card capped to the window height.
 */
export function FloatingChat() {
  const t = useTranslations("assistant")
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [fallback, setFallback] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestions = t.raw("suggestions") as string[]
  const [nudge, setNudge] = useState(false)
  const openedOnceRef = useRef(false)

  // Gentle glow after 15 s to invite the click — cleared forever on first open.
  useEffect(() => {
    const id = setTimeout(() => {
      if (!openedOnceRef.current) setNudge(true)
    }, 15_000)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (open) {
      openedOnceRef.current = true
      setNudge(false)
    }
  }, [open])

  // Other sections (contact CTA, FAQ) open the widget through this event.
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener(OPEN_CHAT_EVENT, handler)
    return () => window.removeEventListener(OPEN_CHAT_EVENT, handler)
  }, [])

  // Mobile sheet: follow the visual viewport (keyboard), lock page scroll, Esc closes.
  const [viewport, setViewport] = useState<{ height: number; top: number } | null>(null)
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia("(max-width: 639px)")
    const vv = window.visualViewport
    const sync = () =>
      setViewport(mq.matches && vv ? { height: vv.height, top: vv.offsetTop } : null)
    sync()
    vv?.addEventListener("resize", sync)
    vv?.addEventListener("scroll", sync)
    mq.addEventListener("change", sync)

    const prevOverflow = document.body.style.overflow
    if (mq.matches) document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)

    return () => {
      vv?.removeEventListener("resize", sync)
      vv?.removeEventListener("scroll", sync)
      mq.removeEventListener("change", sync)
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Autofocus only on desktop: on phones it would pop the keyboard over the
  // greeting and suggestions before the visitor has read them.
  useEffect(() => {
    if (open && window.matchMedia("(min-width: 640px)").matches) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, busy])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || busy) return

      const next: Message[] = [...messages, { role: "user", content: trimmed }]
      setMessages(next)
      setInput("")
      setBusy(true)

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        })
        const data = await res.json()

        if (data?.reply) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
        } else {
          setFallback(true)
          setMessages((prev) => [...prev, { role: "assistant", content: t("fallbackMessage") }])
        }
      } catch {
        setFallback(true)
        setMessages((prev) => [...prev, { role: "assistant", content: t("fallbackMessage") }])
      } finally {
        setBusy(false)
      }
    },
    [busy, messages, t],
  )

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content
  const waHref = whatsAppUrl(
    lastUserMessage ? `${t("waGreeting")} ${lastUserMessage}` : t("waGreeting"),
  )

  return (
    <>
      {/* Launcher — hidden on phones while the sheet is open (the sheet has its own close). */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[70] h-14 w-14 items-center justify-center rounded-full bg-brand-green text-black shadow-[0_8px_32px_rgba(34,242,58,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 ${
          open ? "hidden sm:flex" : "flex"
        } ${nudge ? "animate-glow-pulse" : ""}`}
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <Sparkles className="h-6 w-6" strokeWidth={2.25} />
        )}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label={t("title")}
        style={viewport ? { height: viewport.height, top: viewport.top } : undefined}
        className={`fixed inset-x-0 top-0 z-[80] flex h-[100dvh] flex-col overflow-hidden bg-gray-950 transition-all duration-300 sm:inset-x-auto sm:top-auto sm:bottom-24 sm:right-5 sm:h-[min(620px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-2xl sm:border sm:border-gray-800 sm:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9)] ${
          open
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-800 bg-gray-900 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <BrandMark size={32} glow />
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-sm font-semibold text-gray-100">
              {t("title")}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
              {t("status")}
            </div>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("fallbackCta")}
            title={t("fallbackCta")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-800 bg-gray-950 text-[#25D366] transition-colors hover:border-[#25D366]/50"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("close")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-800 bg-gray-950 text-gray-300 transition-colors hover:text-gray-100 sm:hidden"
          >
            <X className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-4"
        >
          <Bubble role="assistant">{t("greeting")}</Bubble>

          {messages.length === 0 && (
            <div className="flex flex-col items-end gap-2 pt-1">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => send(sug)}
                  className="max-w-[85%] rounded-2xl rounded-br-sm border border-brand-green/30 bg-brand-green/5 px-3.5 py-2 text-left text-sm text-gray-100 transition-colors hover:border-brand-green hover:bg-brand-green/10"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.content}
            </Bubble>
          ))}

          {busy && (
            <Bubble role="assistant">
              <span className="inline-flex gap-1" aria-label={t("thinking")}>
                <Dot delay="0ms" />
                <Dot delay="150ms" />
                <Dot delay="300ms" />
              </span>
            </Bubble>
          )}

          {fallback && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#25D366] px-5 py-2.5 font-display text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t("fallbackCta")}
            </a>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="shrink-0 border-t border-gray-800 bg-gray-900 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-gray-950 py-1 pl-4 pr-1 transition-colors focus-within:border-brand-green">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              maxLength={1000}
              enterKeyHint="send"
              autoComplete="off"
              // 16px on phones: anything smaller makes iOS Safari zoom the page on focus.
              className="h-10 min-w-0 flex-1 bg-transparent text-base text-gray-100 placeholder:text-gray-500 focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={busy || input.trim().length === 0}
              aria-label={t("send")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-black transition-all hover:bg-green-hover disabled:opacity-30"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] leading-relaxed text-gray-500">
            {t("privacyNote")}{" "}
            <a href="/legal#privacidad" className="underline underline-offset-2 hover:text-gray-300">
              {t("privacyLink")}
            </a>
          </p>
        </form>
      </div>
    </>
  )
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div
      className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed sm:text-sm ${
        role === "user"
          ? "self-end rounded-br-sm bg-brand-green text-black"
          : "self-start rounded-bl-sm border border-gray-800 bg-gray-900 text-gray-100"
      }`}
    >
      {children}
    </div>
  )
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-gray-500"
      style={{ animation: `typing 1.2s ease-in-out ${delay} infinite` }}
    />
  )
}
