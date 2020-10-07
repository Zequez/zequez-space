import React from 'react'
import { hsl } from '@/lib/utils'

interface RainbowProfileProps {
  rotation: number
  hue: number
  slices: number[]
  minBorder: number
  maxBorder: number
  darkMode: boolean
  scale: number
}

const R = 50
const VIEWBOX = `-${R} -${R} ${R * 2} ${R * 2}`
const RainbowProfile: React.FC<RainbowProfileProps> = ({
  rotation,
  hue,
  slices,
  minBorder,
  maxBorder,
  darkMode,
  scale = 1,
}) => {
  const len = slices.length
  const dRot = (Math.PI * 2) / len
  const dHue = 360 / len

  const rBase = (R / (R + maxBorder)) * R + minBorder
  const rd = R - rBase

  return (
    <svg
      className={'absolute transform transition-transform duration-150 z-10'}
      style={{
        top: -maxBorder,
        bottom: -maxBorder,
        left: -maxBorder,
        right: -maxBorder,
        transform: `scale(${scale})`,
      }}
      viewBox={VIEWBOX}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {slices.map((r, i) => (
        <Slice
          key={i}
          r={rBase + rd * r}
          a1={rotation + i * dRot}
          a2={rotation + (i + 1) * dRot}
          hue={(hue + dHue * i) % 360}
          darkMode={darkMode}
        />
      ))}
    </svg>
  )
}

// SOH CAH TOA

const { cos, sin } = Math
const Slice: React.FC<{
  r: number
  a1: number
  a2: number
  hue: number
  darkMode: boolean
}> = ({ r, a1, a2, hue, darkMode }) => {
  return (
    <path
      d={`M0 0 L ${cos(a1) * r} ${sin(a1) * r} L ${cos(a2) * r} ${
        sin(a2) * r
      } Z`}
      style={{ fill: hsl(hue, darkMode ? 60 : 75, darkMode ? 25 : 45) }}
    />
  )
}

export default RainbowProfile
