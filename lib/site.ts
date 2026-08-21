/** Company-wide contact constants. */
export const WA_PHONE = "5493329627578"
export const CONTACT_EMAIL = "contacto@potenciapp.com"
export const SITE_URL = "https://potenciapp.com"

export function whatsAppUrl(text: string) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`
}

/** Cross-component signal to open the floating assistant. */
export const OPEN_CHAT_EVENT = "potenciapp:open-chat"

export function openFloatingChat() {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT))
}
