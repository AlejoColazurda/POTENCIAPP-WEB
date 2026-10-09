import Link from "next/link"
import { BrandWordmark } from "@/components/brand"
import { logout } from "./actions"

export function AdminHeader({ email }: { email: string }) {
  return (
    <header className="border-b border-gray-800 bg-gray-900/60">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" aria-label="Panel">
            <BrandWordmark size="sm" />
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">Blog</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <a href="/blog" target="_blank" className="text-gray-300 hover:text-brand-green">
            Ver blog ↗
          </a>
          <span className="hidden text-gray-500 sm:inline">{email}</span>
          <form action={logout}>
            <button type="submit" className="rounded-md border border-gray-800 px-3 py-1.5 text-gray-300 hover:text-gray-100">
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
