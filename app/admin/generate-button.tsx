"use client"

import { useActionState } from "react"
import { generateNow } from "./actions"

export function GenerateButton() {
  const [state, action, pending] = useActionState(generateNow, null)

  return (
    <form action={action} className="flex flex-col items-end">
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 items-center rounded-lg border border-gray-700 px-4 text-sm font-semibold text-gray-100 hover:border-brand-green disabled:opacity-50"
      >
        {pending ? "Generando… (hasta 1 min)" : "Generar borrador con IA"}
      </button>
      {state?.error && <p className="mt-1 max-w-xs text-right text-xs text-red-400">{state.error}</p>}
      {state?.ok && <p className="mt-1 max-w-xs text-right text-xs text-brand-green">{state.ok}</p>}
    </form>
  )
}
