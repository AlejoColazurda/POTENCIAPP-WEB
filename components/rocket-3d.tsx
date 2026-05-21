"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber"
import * as THREE from "three"

/**
 * Rocket3D — Fixed overlay R3F canvas. The rocket lifts from below the viewport
 * to above as the user scrolls the page, rotating subtly and trailing particles.
 * Disabled below md breakpoint (replaced with nothing) to keep mobile clean.
 */
export function Rocket3D() {
  const [enabled, setEnabled] = useState(false)
  const [scroll, setScroll] = useState(0) // 0-1 normalized
  const [mouse, setMouse] = useState({ x: 0, y: 0 }) // -1 to 1
  const rafRef = useRef<number | null>(null)
  const targetScrollRef = useRef(0)

  useEffect(() => {
    // Only enable on desktop and when reduced-motion is OFF
    const mq = window.matchMedia("(min-width: 1024px)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setEnabled(mq.matches && !reduced.matches)
    update()
    mq.addEventListener("change", update)
    reduced.addEventListener("change", update)
    return () => {
      mq.removeEventListener("change", update)
      reduced.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const v = max > 0 ? window.scrollY / max : 0
      targetScrollRef.current = Math.max(0, Math.min(1, v))
    }

    const onMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouse, { passive: true })

    // Smooth easing (lerp factor — smaller = slower, more deliberate)
    const tick = () => {
      setScroll((prev) => prev + (targetScrollRef.current - prev) * 0.05)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouse)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Scene scroll={scroll} mouse={mouse} />
      </Canvas>
    </div>
  )
}

function Scene({ scroll, mouse }: { scroll: number; mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 8]} intensity={2.5} color="#22F23A" />
      <pointLight position={[-5, -5, 8]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[0, 10, 5]} intensity={0.8} color="#ffffff" />
      <Rocket scroll={scroll} mouse={mouse} />
      <ParticleTrail scroll={scroll} />
    </>
  )
}

function Rocket({ scroll, mouse }: { scroll: number; mouse: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null)
  const flameRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!group.current) return

    // Camera at z=12 fov=45 → vertical visible range ≈ [-5, 5]
    const yBase = THREE.MathUtils.lerp(-5.5, 5.5, scroll)
    const xDrift =
      Math.sin(state.clock.elapsedTime * 0.18) * 0.6 + mouse.x * 1.2
    const yWobble = Math.sin(state.clock.elapsedTime * 0.45) * 0.18

    group.current.position.x = xDrift
    group.current.position.y = yBase + yWobble
    group.current.position.z = mouse.y * 0.4

    group.current.rotation.z = THREE.MathUtils.degToRad(-25)
    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.18 + mouse.x * 0.12
    group.current.rotation.x = mouse.y * 0.08

    // Flame flicker — much calmer
    if (flameRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.14
      flameRef.current.scale.y = s
      ;(flameRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.75 + Math.sin(state.clock.elapsedTime * 4.5) * 0.15
    }
  })

  return (
    <group ref={group} scale={0.9}>
      {/* Body — cylindrical */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.8, 24]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.6}
          roughness={0.3}
          emissive="#22F23A"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 1.3, 0]}>
        <coneGeometry args={[0.4, 1, 24]} />
        <meshStandardMaterial
          color="#22F23A"
          metalness={0.7}
          roughness={0.2}
          emissive="#22F23A"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Window */}
      <mesh position={[0, 0.4, 0.42]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#22F23A"
          emissive="#22F23A"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Fin left */}
      <mesh position={[-0.4, -0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.7, 4]} />
        <meshStandardMaterial color="#22F23A" emissive="#22F23A" emissiveIntensity={0.3} />
      </mesh>

      {/* Fin right */}
      <mesh position={[0.4, -0.7, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.7, 4]} />
        <meshStandardMaterial color="#22F23A" emissive="#22F23A" emissiveIntensity={0.3} />
      </mesh>

      {/* Fin back */}
      <mesh position={[0, -0.7, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.3, 0.7, 4]} />
        <meshStandardMaterial color="#22F23A" emissive="#22F23A" emissiveIntensity={0.3} />
      </mesh>

      {/* Flame */}
      <mesh ref={flameRef} position={[0, -1.4, 0]}>
        <coneGeometry args={[0.25, 1.2, 16]} />
        <meshBasicMaterial color="#22F23A" transparent opacity={0.8} />
      </mesh>

      {/* Glow halo */}
      <mesh position={[0, -1.4, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#22F23A" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function ParticleTrail({ scroll }: { scroll: number }) {
  const points = useRef<THREE.Points>(null)
  const count = 160

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 - 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3
      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = -(Math.random() * 0.008 + 0.002)
      velocities[i * 3 + 2] = 0
    }
    return { positions, velocities }
  }, [])

  useFrame(() => {
    if (!points.current) return
    const geom = points.current.geometry
    const pos = geom.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      if (pos[i * 3 + 1] < -10) {
        pos[i * 3 + 1] = 10
        pos[i * 3] = (Math.random() - 0.5) * 4
      }
    }
    geom.attributes.position.needsUpdate = true
    ;(points.current.material as THREE.PointsMaterial).opacity = 0.3 + scroll * 0.4
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#22F23A"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
