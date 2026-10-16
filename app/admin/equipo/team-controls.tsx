"use client"

import { useActionState, useState, useTransition } from "react"
import type { Member } from "@/lib/admin"
import { addMember, copyLoginLink, removeMember, setMemberActive } from "../actions"

export function AddMemberForm() {
  const [state, action, pending] = useActionState(addMember, null)

  return (
    <form action={action} className="mt-3 flex flex-wrap items-end gap-3">
      <label className="block min-w-[240px] flex-1">
        <span className="text-sm text-gray-300">Email</span>
        <input
          name="email"
          type="email"
          required
          className="mt-1 h-10 w-full rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-gray-100 focus:border-brand-green focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="text-sm text-gray-300">Rol</span>
        <select
          name="role"
          defaultValue="editor"
          className="mt-1 h-10 rounded-lg border border-gray-800 bg-gray-900 px-3 text-sm text-gray-100"
        >
          <option value="editor">Editor</option>
          <option value="owner">Dueño</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="h-10 rounded-lg bg-brand-green px-4 text-sm font-semibold text-black hover:bg-green-hover disabled:opacity-50"
      >
        {pending ? "Guardando…" : "Dar acceso"}
      </button>
      {state?.error && <p className="w-full text-sm text-red-400">{state.error}</p>}
      {state?.ok && <p className="w-full text-sm text-brand-green">{state.ok}</p>}
    </form>
  )
}

export function MemberRow({ member }: { member: Member }) {
  const [busy, startTransition] = useTransition()
  const [link, setLink] = useState<{ url?: string; error?: string } | null>(null)

  async function makeLink() {
    const result = await copyLoginLink(member.email)
    setLink(result)
    if (result.url) await navigator.clipboard?.writeText(result.url).catch(() => {})
  }

  return (
    <li className="py-3">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div>
          <span className={member.active ? "text-gray-100" : "text-gray-500 line-through"}>{member.email}</span>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
            {member.role === "owner" ? "dueño" : "editor"}
            {!member.active && " · sin acceso"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {member.active && (
            <button
              type="button"
              disabled={busy}
              onClick={() => startTransition(makeLink)}
              className="h-8 rounded-md border border-gray-700 px-3 text-xs text-gray-200 hover:border-brand-green disabled:opacity-40"
            >
              Copiar link de acceso
            </button>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={() => startTransition(() => setMemberActive(member.email, !member.active))}
            className="h-8 rounded-md border border-gray-700 px-3 text-xs text-gray-200 disabled:opacity-40"
          >
            {member.active ? "Quitar acceso" : "Devolver acceso"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              if (confirm(`¿Sacar a ${member.email} del equipo?`)) startTransition(() => removeMember(member.email))
            }}
            className="h-8 rounded-md px-3 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-40"
          >
            Eliminar
          </button>
        </div>
      </div>
      {link?.url && (
        <div className="mt-2 rounded-md border border-gray-800 bg-gray-900 p-2">
          <p className="text-xs text-gray-400">
            Copiado. Sirve una sola vez y vence en 1 hora. Mandalo por un canal privado.
          </p>
          <input
            readOnly
            value={link.url}
            onFocus={(e) => e.currentTarget.select()}
            className="mt-1 w-full bg-transparent font-mono text-xs text-gray-200 outline-none"
          />
        </div>
      )}
      {link?.error && <p className="mt-2 text-xs text-red-400">{link.error}</p>}
    </li>
  )
}
