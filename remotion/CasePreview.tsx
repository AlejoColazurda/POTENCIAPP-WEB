import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion"

export type CasePreviewProps = {
  title: string
  accent: string
  kind: "dashboard" | "chart" | "mobile" | "code"
}

export const CasePreview: React.FC<CasePreviewProps> = ({ title, accent, kind }) => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames, width, height } = useVideoConfig()
  const t = frame / durationInFrames

  return (
    <AbsoluteFill style={{ background: "#0A0A0A", overflow: "hidden" }}>
      {/* Soft accent halo */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: 9999,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: accent,
          opacity: 0.08,
          filter: "blur(120px)",
        }}
      />

      {/* Title corner */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 50,
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#F5F5F5",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 88,
          fontFamily: "'JetBrains Mono', monospace",
          color: "#6B6B6B",
          fontSize: 14,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        / case preview
      </div>

      {/* Live badge */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 60,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 9999,
          background: "rgba(17,17,17,0.8)",
          border: `1px solid ${accent}66`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: accent,
          letterSpacing: "0.1em",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 9999,
            background: accent,
            opacity: Math.sin(t * Math.PI * 6) * 0.5 + 0.5,
          }}
        />
        LIVE
      </div>

      {kind === "dashboard" && <DashboardScene frame={frame} accent={accent} />}
      {kind === "chart" && <ChartScene frame={frame} fps={fps} accent={accent} />}
      {kind === "mobile" && <MobileScene frame={frame} accent={accent} />}
      {kind === "code" && <CodeScene frame={frame} fps={fps} accent={accent} />}
    </AbsoluteFill>
  )
}

function DashboardScene({ frame, accent }: { frame: number; accent: string }) {
  const tCount = interpolate(frame, [0, 60], [0, 124812], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0, 1),
  })
  const revenue = Math.floor(tCount).toLocaleString("es-AR")

  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]
  return (
    <>
      {/* Main panel */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 160,
          right: 60,
          bottom: 60,
          background: "#111111",
          border: "1px solid #1A1A1A",
          borderRadius: 16,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Big revenue */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#6B6B6B",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              GROSS REVENUE
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 64,
                fontWeight: 700,
                color: "#F5F5F5",
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ${revenue}
            </div>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              color: accent,
            }}
          >
            ▲ +18.4%
          </div>
        </div>

        {/* Bars */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            gap: 10,
            paddingTop: 30,
          }}
        >
          {bars.map((h, i) => {
            const grow = interpolate(frame, [10 + i * 4, 50 + i * 4], [0, h], {
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            })
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${grow}%`,
                  background: `linear-gradient(180deg, ${accent} 0%, ${accent}33 100%)`,
                  borderRadius: 4,
                }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

function ChartScene({ frame, fps, accent }: { frame: number; fps: number; accent: string }) {
  const points = [
    { x: 0.05, y: 0.8 },
    { x: 0.2, y: 0.65 },
    { x: 0.35, y: 0.72 },
    { x: 0.5, y: 0.5 },
    { x: 0.65, y: 0.42 },
    { x: 0.8, y: 0.25 },
    { x: 0.95, y: 0.12 },
  ]
  const totalLen = 1100
  const dashOffset = interpolate(frame, [0, 90], [totalLen, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  })
  // Build path d
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * 1080 + 60} ${p.y * 480 + 200}`)
    .join(" ")
  const area = `${path} L ${points[points.length - 1].x * 1080 + 60} 680 L ${points[0].x * 1080 + 60} 680 Z`
  return (
    <svg width={1200} height={750} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id="caseArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0.25, 0.5, 0.75, 1].map((p, i) => (
        <line
          key={i}
          x1={60}
          x2={1140}
          y1={200 + p * 480}
          y2={200 + p * 480}
          stroke="#1A1A1A"
          strokeDasharray="2 4"
        />
      ))}
      <path d={area} fill="url(#caseArea)" opacity={interpolate(frame, [40, 100], [0, 1], { extrapolateRight: "clamp" })} />
      <path
        d={path}
        fill="none"
        stroke={accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLen}
        strokeDashoffset={dashOffset}
      />
      {points.map((p, i) => {
        const reveal = interpolate(frame, [20 + i * 8, 50 + i * 8], [0, 6], {
          extrapolateRight: "clamp",
        })
        return (
          <circle
            key={i}
            cx={p.x * 1080 + 60}
            cy={p.y * 480 + 200}
            r={reveal}
            fill={accent}
          />
        )
      })}
    </svg>
  )
}

function MobileScene({ frame, accent }: { frame: number; accent: string }) {
  const cycle = (frame / 30) % 3
  const screenIdx = Math.floor(cycle)
  const slideX = interpolate(cycle - screenIdx, [0, 1], [0, -360], { extrapolateRight: "clamp" })

  return (
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
          width: 360,
          height: 600,
          background: "#111111",
          border: "8px solid #1A1A1A",
          borderRadius: 36,
          overflow: "hidden",
          position: "relative",
          boxShadow: `0 24px 64px ${accent}30`,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 1080,
            height: "100%",
            transform: `translateX(${-screenIdx * 360 + slideX}px)`,
            transition: "transform 0.5s ease",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 360,
                height: "100%",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                background: i === 0 ? "#0A0A0A" : i === 1 ? "#111111" : "#0A0A0A",
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#F5F5F5",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              >
                Screen {i + 1}
              </div>
              <div
                style={{
                  height: 120,
                  background: accent,
                  opacity: 0.15,
                  borderRadius: 12,
                }}
              />
              {[0, 1, 2, 3].map((j) => (
                <div
                  key={j}
                  style={{
                    height: 40,
                    background: "#1A1A1A",
                    borderRadius: 8,
                    borderLeft: `2px solid ${accent}`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CodeScene({ frame, fps, accent }: { frame: number; fps: number; accent: string }) {
  const lines = [
    "$ git checkout main",
    "$ npm run deploy --target=prod",
    "→ building bundles",
    "→ uploading artifacts",
    "→ invalidating cdn",
    "✓ deploy ready · 1.2s",
    "→ running health checks",
    "✓ all systems nominal",
  ]
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 160,
        right: 60,
        bottom: 60,
        background: "#0A0A0A",
        border: "1px solid #1A1A1A",
        borderRadius: 16,
        padding: 36,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 22,
        lineHeight: 1.8,
        color: "#B8B8B8",
        overflow: "hidden",
      }}
    >
      {lines.map((line, i) => {
        const startFrame = i * 12
        const visible = frame >= startFrame
        if (!visible) return null
        const typedChars = Math.min(
          line.length,
          Math.floor((frame - startFrame) * 1.5),
        )
        return (
          <div key={i} style={{ color: line.startsWith("✓") ? accent : "#B8B8B8" }}>
            {line.slice(0, typedChars)}
            {typedChars < line.length && (
              <span style={{ opacity: Math.sin(frame * 0.5) * 0.5 + 0.5 }}>▌</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
