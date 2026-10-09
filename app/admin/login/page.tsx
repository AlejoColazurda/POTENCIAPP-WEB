import { isSupabaseConfigured } from "@/lib/supabase"
import { BrandWordmark } from "@/components/brand"
import { LoginForm } from "./login-form"

export const dynamic = "force-dynamic"

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured()

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <BrandWordmark size="md" />
        <h1 className="mt-8 font-display text-2xl font-bold">Panel de administración</h1>
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
