"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { EquipoMedia } from "@/components/equipo-media"
import type { PublicMember } from "@/lib/equipo/types"

export function EquipoGrid({ members }: { members: PublicMember[] }) {
  const t = useTranslations("equipo")
  if (members.length === 0) return null

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <li key={member.id}>
          <Card className="gap-0 overflow-hidden border-gray-800 bg-[#111111] py-0 motion-reduce:transform-none">
            <EquipoMedia member={member} variant="card" />
            <CardContent className="p-5">
              <h2 className="font-display text-xl font-semibold tracking-tight text-[#F5F5F5]">
                {member.name}
              </h2>
              <p className="mt-1 text-sm text-[#22F23A]">{t(`roles.${member.roleKey}`)}</p>
              {member.line ? (
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#B8B8B8]">
                  {member.line}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  )
}
