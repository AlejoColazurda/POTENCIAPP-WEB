import { existsSync } from "node:fs"
import { join } from "node:path"
import roster from "@/content/equipo.json"
import {
  initialsFromName,
  isRoleKey,
  type PublicMember,
  type RosterMember,
} from "@/lib/equipo/types"

function resolvePhotoSrc(photo: string): string | null {
  const trimmed = photo.trim()
  if (!trimmed) return null
  const filename = trimmed.replace(/^\/?equipo\//, "").replace(/^\//, "")
  if (
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\")
  ) {
    return null
  }
  const abs = join(process.cwd(), "public", "equipo", filename)
  if (!existsSync(abs)) return null
  return `/equipo/${filename}`
}

/**
 * A member becomes a card only with publish + name + known roleKey + a
 * non-empty line. Missing or broken photos fall back to initials — never
 * stock faces. Photo existence is not a hard gate.
 */
export function getPublicMembers(): PublicMember[] {
  const members = (roster.members ?? []) as RosterMember[]
  return members.flatMap((member) => {
    if (member.publish !== true) return []
    const name = typeof member.name === "string" ? member.name.trim() : ""
    const line = typeof member.line === "string" ? member.line.trim() : ""
    if (!name || !line || !isRoleKey(member.roleKey)) return []
    return [
      {
        id: member.id || name.toLowerCase().replace(/\s+/g, "-"),
        name,
        roleKey: member.roleKey,
        line,
        photoSrc: resolvePhotoSrc(typeof member.photo === "string" ? member.photo : ""),
        initials: initialsFromName(name),
      },
    ]
  })
}

export function equipoPlateSrc(): string | null {
  const rel = "studio/plates/plate-equipo-16x9.jpg"
  return existsSync(join(process.cwd(), "public", rel)) ? `/${rel}` : null
}

export function equipoOgImageSrc(): string {
  const rel = "studio/og/og-equipo-1200x630.jpg"
  return existsSync(join(process.cwd(), "public", rel)) ? `/${rel}` : "/og.png"
}
