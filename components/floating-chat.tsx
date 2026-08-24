"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { BrandMark } from "@/components/brand"
import { OPEN_CHAT_EVENT, whatsAppUrl } from "@/lib/site"

type Message = { role: "user" | "assistant"; content: string }

/**
 * Floating assistant, bottom-right on every page. Backed by /api/chat (Gemini);
 * if the API has no key or errors, the thread degrades to a WhatsApp handoff
 * instead of a dead input.
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

  useEffect(() => {
    if (open) inputRef.current?.focus()
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
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-black shadow-[0_8px_32px_rgba(34,242,58,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 ${nudge ? "animate-glow-pulse" : ""}`}
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2.5} />
        )}
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label={t("title")}
        className={`fixed bottom-24 right-5 z-[70] flex w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9)] transition-all duration-300 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-800 bg-gray-900 px-4 py-3">
          <BrandMark size={28} glow />
          <div className="min-w-0">
            <div className="font-display text-sm font-semibold text-gray-100">{t("title")}</div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
              {t("status")}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex h-[340px] flex-col gap-3 overflow-y-auto p-4">
          <Bubble role="assistant">{t("greeting")}</Bubble>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => send(sug)}
                  className="rounded-full border border-gray-800 bg-gray-900 px-3 py-1.5 text-left text-xs text-gray-300 transition-colors hover:border-brand-green/50 hover:text-gray-100"
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 font-display text-sm font-bold text-black transition-colors hover:bg-green-hover"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
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
          className="flex items-center gap-2 border-t border-gray-800 bg-gray-900 p-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("placeholder")}
            maxLength={1000}
            className="h-10 flex-1 rounded-lg border border-gray-800 bg-gray-950 px-3 text-sm text-gray-100 placeholder:text-gray-500 focus:border-brand-green focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || input.trim().length === 0}
            aria-label={t("send")}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green text-black transition-all hover:bg-green-hover disabled:opacity-40"
          >
            <Send className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </form>

        <p className="border-t border-gray-800 bg-gray-950 px-3 py-2 text-center text-[10px] leading-relaxed text-gray-500">
          {t("privacyNote")}{" "}
          <a href="/legal#privacidad" className="underline underline-offset-2 hover:text-gray-300">
            {t("privacyLink")}
          </a>
        </p>
      </div>
    </>
  )
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div
      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
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
