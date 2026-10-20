import { requireOwner, type Member } from "@/lib/admin"
import { adminEmails, serviceClient } from "@/lib/supabase"
import { AdminHeader } from "../admin-header"
import { AddMemberForm, MemberRow } from "./team-controls"

export const dynamic = "force-dynamic"

export default async function TeamPage() {
  const { email, role } = await requireOwner()
  const { data, error } = await serviceClient()
    .from("blog_members")
    .select("email,role,active,invited_by,created_at")
    .order("created_at", { ascending: true })
  const members = (data ?? []) as Member[]

  return (
    <>
      <AdminHeader email={email} role={role} />
      <main className="mx-auto max-w-[900px] px-4 py-10">
        <h1 className="font-display text-3xl font-bold">Equipo</h1>
        <p className="mt-1 text-sm text-gray-400">
          Quién puede entrar al panel. Se entra sin contraseña, con un link de un solo uso que vence en 1 hora.
          Los editores escriben, editan y publican; solo los dueños eliminan artículos y manejan el equipo.
        </p>

        <section className="mt-8">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Dueños (ADMIN_EMAILS en Vercel)</h2>
          <ul className="mt-2 divide-y divide-gray-800 border-y border-gray-800">
            {adminEmails().map((e) => (
              <li key={e} className="py-3 text-sm text-gray-200">
                {e}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Invitados desde el panel</h2>
          {error && <p className="mt-2 text-sm text-red-400">No se pudo leer el equipo: {error.message}</p>}
          <ul className="mt-2 divide-y divide-gray-800 border-y border-gray-800">
            {members.length === 0 && <li className="py-4 text-sm text-gray-500">Todavía no invitaste a nadie.</li>}
            {members.map((m) => (
              <MemberRow key={m.email} member={m} />
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Dar acceso</h2>
          <AddMemberForm />
        </section>
      </main>
    </>
  )
}
