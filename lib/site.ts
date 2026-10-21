/** Company-wide contact constants. */
export const WA_PHONE = "5493329613035"
export const CONTACT_EMAIL = "contacto@potenciapp.com"
export const SITE_URL = "https://www.potenciapp.com"
/** Google Calendar appointment page for a commercial meeting. */
export const BOOKING_URL = "https://calendar.app.google/g77kHG1LCckzPY2o9"

export function whatsAppUrl(text: string) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`
}

/** Cross-component signal to open the floating assistant. */
export const OPEN_CHAT_EVENT = "potenciapp:open-chat"

export function openFloatingChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT))
}
