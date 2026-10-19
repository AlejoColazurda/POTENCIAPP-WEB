export const KNOWN_ROLE_KEYS = [
  "founder",
  "engineering",
  "design",
  "ops",
] as const

export type RoleKey = (typeof KNOWN_ROLE_KEYS)[number]

export type RosterMember = {
  id: string
  name: string
  roleKey: string
  line: string
  photo: string
  publish: boolean
}

export type PublicMember = {
  id: string
  name: string
  roleKey: RoleKey
  line: string
  photoSrc: string | null
  initials: string
}

export function isRoleKey(value: string): value is RoleKey {
  return (KNOWN_ROLE_KEYS as readonly string[]).includes(value)
}

export function initialsFromName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 3)
    .toUpperCase()
}
