import Link from "next/link"
import { requireAdmin } from "@/lib/admin"
import { AdminHeader } from "../../admin-header"
import { PostEditor } from "../post-editor"

export const dynamic = "force-dynamic"

export default async function NewPostPage() {
  const { email, role } = await requireAdmin()
  return (
    <>
      <AdminHeader email={email} role={role} />
      <main className="mx-auto max-w-[900px] px-4 py-10">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-brand-green">
          ← Todos los artículos
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold">Nuevo artículo</h1>
        <p className="mt-1 text-sm text-gray-400">Se guarda como borrador. Lo publicás cuando esté listo.</p>
        <div className="mt-8">
          <PostEditor post={null} />
        </div>
      </main>
    </>
  )
}
