import { StatusPage, statusPrimary, statusSecondary } from "@/components/status-page"

/** 404 inside the admin panel (unknown /admin/... path or a deleted post). */
export default function AdminNotFound() {
  return (
    <StatusPage
      code="404"
      eyebrow="Panel del blog"
      title="Esta página del panel no existe."
      body="Puede que el artículo se haya eliminado o que el link esté incompleto."
      logo={
        <a href="/admin" aria-label="Panel">
          {/* Same wordmark as the rest of the panel. */}
          <img src="/branding/png/wordmark-dark-800.png" alt="PotenciApp" width={200} height={28} />
        </a>
      }
      actions={
        <>
          <a href="/admin" className={statusPrimary}>
            Volver al panel
          </a>
          <a href="/" className={statusSecondary}>
            Ir al sitio
          </a>
        </>
      }
    />
  )
}
