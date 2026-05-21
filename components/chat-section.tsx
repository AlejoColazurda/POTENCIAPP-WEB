"use client"

import { useReducer, useEffect, useRef, useMemo } from "react"
import { ArrowRight, RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  STEPS,
  buildWhatsAppUrl,
  type ChatTag,
  type ChatStep,
  type ChatOption,
} from "@/lib/chat-flow"
import { BrandMark } from "@/components/brand"

type Message =
  | { kind: "bot"; text: string }
  | { kind: "user"; text: string }
  | { kind: "options"; step: ChatStep }
  | { kind: "final"; href: string }

type State = {
  stepId: string
  tags: ChatTag[]
  messages: Message[]
  typing: boolean
}

type Action =
  | { type: "advance"; stepId: string; tag?: ChatTag; userLabel?: string; botText: string }
  | { type: "show-options"; step: ChatStep }
  | { type: "show-final"; href: string }
  | { type: "typing"; on: boolean }
  | { type: "reset"; startBotText: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "advance": {
      const newTags = action.tag ? [...state.tags, action.tag] : state.tags
      const userMessages: Message[] = action.userLabel
        ? [{ kind: "user", text: action.userLabel }]
        : []
      return {
        stepId: action.stepId,
        tags: newTags,
        messages: [
          ...state.messages.filter((m) => m.kind !== "options"),
          ...userMessages,
          { kind: "bot", text: action.botText },
        ],
        typing: false,
      }
    }
    case "show-options":
      return { ...state, messages: [...state.messages, { kind: "options", step: action.step }] }
    case "show-final":
      return { ...state, messages: [...state.messages, { kind: "final", href: action.href }] }
    case "typing":
      return { ...state, typing: action.on }
    case "reset":
      return {
        stepId: "start",
        tags: [],
        messages: [
          { kind: "bot", text: action.startBotText },
          { kind: "options", step: STEPS.start },
        ],
        typing: false,
      }
  }
}

export function ChatSection() {
  const t = useTranslations("chat")
  const tf = useTranslations("chatFlow")
  const tTag = useTranslations("chatFlow.tags")

  // Initial state references the start bot text from the *current* locale
  const initialState: State = useMemo(
    () => ({
      stepId: "start",
      tags: [],
      messages: [
        { kind: "bot", text: tf("start.bot") },
        { kind: "options", step: STEPS.start },
      ],
      typing: false,
    }),
    // Re-derive when locale changes (tf identity changes per locale).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tf("start.bot")],
  )

  const [state, dispatch] = useReducer(reducer, initialState)
  const scrollRef = useRef<HTMLDivElement>(null)
  const perks = t.raw("perks") as string[]

  // If the locale changes mid-conversation, reset to start so the user
  // doesn't see a half-Spanish half-English transcript.
  useEffect(() => {
    dispatch({ type: "reset", startBotText: tf("start.bot") })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tf("start.bot")])

  // Scroll on new message
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [state.messages.length, state.typing])

  function handleChoice(opt: ChatOption) {
    const tagText = tTag(opt.tagKey)
    const userLabel = tf(opt.labelKey)
    const tag = { key: state.stepId, tag: tagText }
    const next = STEPS[opt.nextStep]
    const nextBotText = tf(next.botKey)

    dispatch({ type: "typing", on: true })

    setTimeout(() => {
      dispatch({
        type: "advance",
        stepId: opt.nextStep,
        tag,
        userLabel,
        botText: nextBotText,
      })

      if (next.isFinal) {
        const allTags = [...state.tags, tag]
        const href = buildWhatsAppUrl(allTags, tf("greeting"))
        setTimeout(() => dispatch({ type: "show-final", href }), 400)
      } else if (next.options) {
        setTimeout(() => dispatch({ type: "show-options", step: next }), 400)
      }
    }, 700)
  }

  return (
    <section
      id="chat"
      className="relative bg-gray-950 py-20 lg:py-32 border-t border-gray-800 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-1/2 right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-green/10 blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-start">
          <div className="lg:pt-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-300">
                {t("eyebrow")}
              </span>
            </span>

            <h2 className="mt-5 font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.02em] text-gray-100">
              {t("title")} <span className="text-brand-green">{t("accent")}</span>
            </h2>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-md">{t("subtitle")}</p>

            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-[0_24px_64px_-12px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800 bg-gray-900">
              <BrandMark size={40} glow />
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-gray-100 text-sm">PotenciApp</div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse-dot" />
                  {t("online")}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "reset", startBotText: tf("start.bot") })
                }
                className="p-2 text-gray-500 hover:text-gray-100 transition-colors"
                aria-label={t("reset")}
                title={t("reset")}
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              className="h-[460px] overflow-y-auto px-5 py-6 space-y-3 bg-gray-950 no-scrollbar"
            >
              {state.messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  msg={msg}
                  onChoice={handleChoice}
                  cta={t("openWhatsApp")}
                  optionLabel={(key) => tf(key)}
                />
              ))}
              {state.typing && (
                <div className="flex">
                  <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                    <Dot delay="0ms" />
                    <Dot delay="120ms" />
                    <Dot delay="240ms" />
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-gray-800 bg-gray-900 font-mono text-[11px] uppercase tracking-wider text-gray-500 flex items-center justify-between">
              <span>
                {state.tags.length} {state.tags.length === 1 ? t("context") : t("contexts")}
              </span>
              <span>{t("endsAt")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-gray-500"
      style={{ animation: "typing 2s ease-in-out infinite", animationDelay: delay }}
    />
  )
}

function ChatMessage({
  msg,
  onChoice,
  cta,
  optionLabel,
}: {
  msg: Message
  onChoice: (opt: ChatOption) => void
  cta: string
  optionLabel: (key: string) => string
}) {
  if (msg.kind === "bot") {
    return (
      <div className="flex animate-fade-in-up">
        <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] text-base leading-relaxed">
          {msg.text}
        </div>
      </div>
    )
  }
  if (msg.kind === "user") {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="bg-brand-green text-black rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] text-base font-medium">
          {msg.text}
        </div>
      </div>
    )
  }
  if (msg.kind === "options") {
    return (
      <div className="flex flex-wrap gap-2 pt-2 animate-fade-in-up">
        {msg.step.options?.map((opt) => (
          <button
            key={opt.labelKey}
            type="button"
            onClick={() => onChoice(opt)}
            className="px-4 h-11 min-h-[44px] rounded-full bg-gray-900 border border-gray-800 text-sm font-medium text-gray-100 hover:border-brand-green hover:text-brand-green transition-colors duration-200"
          >
            {optionLabel(opt.labelKey)}
          </button>
        ))}
      </div>
    )
  }
  if (msg.kind === "final") {
    return (
      <div className="pt-2 animate-fade-in-up">
        <a
          href={msg.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-14 rounded-xl bg-brand-green text-black font-display font-bold text-base hover:bg-green-hover hover:shadow-[0_0_32px_rgba(34,242,58,0.5)] transition-all duration-300 active:scale-[0.98]"
        >
          {cta}
          <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
        </a>
      </div>
    )
  }
  return null
}
