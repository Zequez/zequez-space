import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { hsl } from '@/lib/utils'
import { useHueAt } from './hooks'

interface ColorTextProps {}

const ColorText: React.FC<ColorTextProps> = observer(({ children }) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const hue = useHueAt(textRef)

  return (
    <span ref={textRef} style={{ color: hsl((hue + 180) % 360, 60, 90) }}>
      {children}
    </span>
  )
})

export default ColorText
