"use client"

import { useActionState } from "react"
import { login } from "../actions"

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null)

  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-sm text-gray-300">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-1 h-11 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-base text-gray-100 focus:border-brand-green focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="text-sm text-gray-300">Contraseña</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 h-11 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-base text-gray-100 focus:border-brand-green focus:outline-none"
        />
      </label>
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-brand-green font-semibold text-black transition-colors hover:bg-green-hover disabled:opacity-50"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  )
}
