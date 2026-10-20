import { BrandWordmark } from "@/components/brand"
import { confirmLogin } from "../../actions"

export const dynamic = "force-dynamic"

/**
 * Landing page of every one-time login link. The token is spent only when the
 * person clicks "Entrar" (a POST), never on page load: mail scanners such as
 * Outlook Safe Links open every link in a message, and a GET that consumed the
 * token would leave the real click with an expired link.
 */
export default async function ConfirmLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string; type?: string; code?: string }>
}) {
  const { token_hash, type, code } = await searchParams
  const valid = Boolean((token_hash && type) || code)

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <BrandWordmark size="md" />
        <h1 className="mt-8 font-display text-2xl font-bold">Entrar al panel</h1>
        {valid ? (
          <form action={confirmLogin} className="mt-6">
            <input type="hidden" name="token_hash" value={token_hash ?? ""} />
            <input type="hidden" name="type" value={type ?? ""} />
            <input type="hidden" name="code" value={code ?? ""} />
            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-brand-green font-semibold text-black transition-colors hover:bg-green-hover"
            >
              Entrar
            </button>
            <p className="mt-3 text-xs text-gray-500">El link sirve una sola vez y vence a la hora de pedirlo.</p>
          </form>
        ) : (
          <p className="mt-4 text-sm text-gray-400">
            Este link está incompleto.{" "}
            <a href="/admin/login" className="text-brand-green hover:underline">
              Pedí uno nuevo
            </a>
            .
          </p>
        )}
      </div>
    </main>
  )
}
