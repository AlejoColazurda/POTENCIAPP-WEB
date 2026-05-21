"use client"

import dynamic from "next/dynamic"

// SSR off — three.js wants the browser. Loader pattern avoids next/dynamic ssr:false
// in server components (which Next.js 15+ disallows).
const Rocket3D = dynamic(() => import("./rocket-3d").then((m) => m.Rocket3D), {
  ssr: false,
  loading: () => null,
})

export function Rocket3DMount() {
  return <Rocket3D />
}
