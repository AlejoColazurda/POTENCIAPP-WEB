export type ChatTag = { key: string; tag: string }

export type ChatStep = {
  id: string
  /** key under chatFlow.{step}.bot in messages */
  botKey: string
  options?: ChatOption[]
  isFinal?: boolean
}

export type ChatOption = {
  /** key under chatFlow.{step}.{key} for the displayed label */
  labelKey: string
  /** key under chatFlow.tags.{key} for the WhatsApp context tag */
  tagKey: string
  nextStep: string
}

export const WA_PHONE = "5493329627578"

export function buildWhatsAppUrl(tags: ChatTag[], greeting: string) {
  const ctx = tags.length ? ` Contexto: ${tags.map((t) => t.tag).join(" · ")}.` : ""
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(greeting + ctx)}`
}

export const STEPS: Record<string, ChatStep> = {
  start: {
    id: "start",
    botKey: "start.bot",
    options: [
      { labelKey: "start.opt1", tagKey: "nuevo", nextStep: "nuevo" },
      { labelKey: "start.opt2", tagKey: "optimizar", nextStep: "optimizar" },
      { labelKey: "start.opt3", tagKey: "ia", nextStep: "ia" },
      { labelKey: "start.opt4", tagKey: "exploratorio", nextStep: "urgencia" },
    ],
  },
  nuevo: {
    id: "nuevo",
    botKey: "nuevo.bot",
    options: [
      { labelKey: "nuevo.opt1", tagKey: "app", nextStep: "urgencia" },
      { labelKey: "nuevo.opt2", tagKey: "web", nextStep: "urgencia" },
      { labelKey: "nuevo.opt3", tagKey: "sistema", nextStep: "urgencia" },
      { labelKey: "nuevo.opt4", tagKey: "ecommerce", nextStep: "urgencia" },
    ],
  },
  optimizar: {
    id: "optimizar",
    botKey: "optimizar.bot",
    options: [
      { labelKey: "optimizar.opt1", tagKey: "performance", nextStep: "urgencia" },
      { labelKey: "optimizar.opt2", tagKey: "bugs", nextStep: "urgencia" },
      { labelKey: "optimizar.opt3", tagKey: "escala", nextStep: "urgencia" },
      { labelKey: "optimizar.opt4", tagKey: "costos", nextStep: "urgencia" },
    ],
  },
  ia: {
    id: "ia",
    botKey: "ia.bot",
    options: [
      { labelKey: "ia.opt1", tagKey: "chatbot", nextStep: "urgencia" },
      { labelKey: "ia.opt2", tagKey: "automatizacion", nextStep: "urgencia" },
      { labelKey: "ia.opt3", tagKey: "datos", nextStep: "urgencia" },
      { labelKey: "ia.opt4", tagKey: "iaSinDefinir", nextStep: "urgencia" },
    ],
  },
  urgencia: {
    id: "urgencia",
    botKey: "urgencia.bot",
    options: [
      { labelKey: "urgencia.opt1", tagKey: "urgente", nextStep: "final" },
      { labelKey: "urgencia.opt2", tagKey: "estaSem", nextStep: "final" },
      { labelKey: "urgencia.opt3", tagKey: "sinApuro", nextStep: "final" },
    ],
  },
  final: {
    id: "final",
    botKey: "final.bot",
    isFinal: true,
  },
}
