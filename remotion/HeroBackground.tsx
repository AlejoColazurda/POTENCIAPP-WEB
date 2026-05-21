import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion"

export const HeroBackground: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames, width, height } = useVideoConfig()
  const t = frame / durationInFrames

  // Grid pan (very slow)
  const gridX = interpolate(frame, [0, durationInFrames], [0, -64])
  const gridY = interpolate(frame, [0, durationInFrames], [0, -64])

  // Big outline text pulse
  const outlineOpacity = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [0.06, 0.12, 0.06],
    { easing: Easing.bezier(0.4, 0, 0.2, 1) },
  )

  // Sweep gradient
  const sweepX = interpolate(frame, [0, durationInFrames], [-width, width * 2])

  // Particles
  const particles = Array.from({ length: 36 }).map((_, i) => {
    const seed = i * 13.37
    const x = (Math.sin(seed) * 0.5 + 0.5) * width
    const baseY = (Math.cos(seed * 1.7) * 0.5 + 0.5) * height
    const drift = ((frame + i * 12) * 0.6) % (height + 80)
    const y = (baseY - drift + height + 80) % (height + 80)
    const opacity =
      Math.sin((frame / fps + i) * 0.7) * 0.35 + 0.45
    const size = 1.5 + ((i * 7) % 4) * 0.6
    return { x, y, opacity: Math.max(0.1, opacity), size, key: i }
  })

  // Data flow horizontal line scanning vertically
  const scanY = interpolate(
    frame % (durationInFrames / 2),
    [0, durationInFrames / 2],
    [-100, height + 100],
  )

  // Code-ish lines blinking
  const codeLines = [
    { x: 120, y: 200, w: 280, delay: 0 },
    { x: 1500, y: 320, w: 320, delay: 18 },
    { x: 200, y: 740, w: 340, delay: 30 },
    { x: 1380, y: 880, w: 260, delay: 45 },
    { x: 80, y: 480, w: 240, delay: 60 },
  ]

  return (
    <AbsoluteFill style={{ background: "#0A0A0A", overflow: "hidden" }}>
      {/* Grid pattern */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            x={gridX}
            y={gridY}
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#22F23A"
              strokeOpacity="0.06"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="rgba(34,242,58,0.08)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
        <rect width={width} height={height} fill="url(#vignette)" />
      </svg>

      {/* Giant outline word */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontWeight: 700,
          fontSize: 320,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "2px rgba(34,242,58,0.6)",
          opacity: outlineOpacity,
          userSelect: "none",
        }}
      >
        POTENCIAMOS
      </div>

      {/* Sweep gradient */}
      <div
        style={{
          position: "absolute",
          left: sweepX,
          top: 0,
          width: width / 2,
          height: "100%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,242,58,0.06) 50%, transparent 100%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      {/* Particles */}
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {particles.map((p) => (
          <circle
            key={p.key}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="#22F23A"
            opacity={p.opacity * 0.5}
          >
            <animate />
          </circle>
        ))}
      </svg>

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: scanY,
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(34,242,58,0.4) 50%, transparent 100%)",
          boxShadow: "0 0 24px rgba(34,242,58,0.3)",
          opacity: 0.4,
        }}
      />

      {/* Code-ish lines */}
      {codeLines.map((line, i) => {
        const phase = ((frame + line.delay) / fps) % 3
        const w = phase < 1.5 ? interpolate(phase, [0, 1.5], [0, line.w]) : line.w
        const o = phase < 1.5 ? 1 : interpolate(phase, [1.5, 3], [1, 0])
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: line.x,
              top: line.y,
              width: w,
              height: 1.5,
              background: "rgba(34,242,58,0.5)",
              opacity: o * 0.7,
              boxShadow: "0 0 8px rgba(34,242,58,0.4)",
            }}
          />
        )
      })}

      {/* Center brand pulse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 120 + Math.sin(t * Math.PI * 2) * 8,
            height: 120 + Math.sin(t * Math.PI * 2) * 8,
            borderRadius: 9999,
            border: "2px solid rgba(34,242,58,0.18)",
            boxShadow: "0 0 80px rgba(34,242,58,0.18)",
          }}
        />
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "30%",
          background: "linear-gradient(180deg, transparent 0%, #0A0A0A 100%)",
        }}
      />
    </AbsoluteFill>
  )
}
