import { isSupabaseConfigured } from "@/lib/supabase"
import { BrandWordmark } from "@/components/brand"
import { LoginForm } from "./login-form"

export const dynamic = "force-dynamic"

const ERRORS: Record<string, string> = {
  link: "El link venció o ya se usó. Pedí uno nuevo.",
  denied: "Ese email no tiene acceso al panel.",
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const configured = isSupabaseConfigured()
  const { error } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <BrandWordmark size="md" />
        <h1 className="mt-8 font-display text-2xl font-bold">Panel del blog</h1>
        {error && ERRORS[error] && <p className="mt-4 text-sm text-red-400">{ERRORS[error]}</p>}
        {configured ? (
          <LoginForm />
        ) : (
          <p className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm leading-relaxed text-yellow-200">
            El panel todavía no está configurado. Faltan las variables de Supabase en el servidor
            (ver <code>docs/admin-setup.md</code>).
          </p>
        )}
      </div>
    </main>
  )
}
