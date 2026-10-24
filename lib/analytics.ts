import { sendGAEvent } from "@next/third-parties/google"

/** GA4 measurement ID (`G-XXXXXXX`). Analytics stays fully off when it is missing. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined

type EventParams = Record<string, string | number | boolean | undefined>

/** No-op without a GA ID, so call sites never need to check. */
export function trackEvent(name: string, params: EventParams = {}) {
  if (!GA_ID) return
  sendGAEvent("event", name, params)
}
