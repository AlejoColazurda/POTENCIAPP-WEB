"use client"

import { useActionState } from "react"
import { generateMonthlyNow, generateNow } from "./actions"

function AiButton({
  run,
  label,
}: {
  run: typeof generateNow
  label: string
}) {
  const [state, action, pending] = useActionState(run, null)

  return (
    <form action={action} className="flex flex-col items-end">
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 items-center rounded-lg border border-gray-700 px-4 text-sm font-semibold text-gray-100 hover:border-brand-green disabled:opacity-50"
      >
        {pending ? "Generando… (hasta 1 min)" : label}
      </button>
      {state?.error && <p className="mt-1 max-w-xs text-right text-xs text-red-400">{state.error}</p>}
      {state?.ok && <p className="mt-1 max-w-xs text-right text-xs text-brand-green">{state.ok}</p>}
    </form>
  )
}

export function GenerateButton() {
  return <AiButton run={generateNow} label="Generar borrador con IA" />
}

export function MonthlyButton() {
  return <AiButton run={generateMonthlyNow} label="Generar resumen del mes" />
}
