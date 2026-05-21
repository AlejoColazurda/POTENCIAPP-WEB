import { Composition } from "remotion"
import { HeroBackground } from "./HeroBackground"
import { CasePreview } from "./CasePreview"

const CASE_PROPS = [
  { title: "Nordix", accent: "#22F23A", kind: "dashboard" as const },
  { title: "Atlasware", accent: "#3B9EFF", kind: "code" as const },
  { title: "Forge", accent: "#22F23A", kind: "chart" as const },
  { title: "Valka", accent: "#FFB020", kind: "mobile" as const },
  { title: "Quantum", accent: "#22F23A", kind: "chart" as const },
  { title: "Meridian", accent: "#22F23A", kind: "dashboard" as const },
]

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroBackground"
        component={HeroBackground}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      {CASE_PROPS.map((p, i) => (
        <Composition
          key={i}
          id={`CasePreview${i + 1}`}
          component={CasePreview}
          durationInFrames={120}
          fps={30}
          width={1200}
          height={750}
          defaultProps={p}
        />
      ))}
    </>
  )
}
