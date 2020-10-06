import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { Point, Points, clone } from './Points'

export const SVG_W = 1000
export const SVG_H = 500

export type Path = {
  t: number // top
  a: number // left handle
  z: number // right handle
  c1x: number // control 1 x
  c1y: number // control 1 y
  c2x: number // control 2 x
  c2y: number // control 2 y
}

export type SvgBlobProps = {
  path: Path
  color: string
  onRemove?: () => void
  className?: string
  onPathChange?: (path: Path) => void
}

const adjustTop = (p: Path): Path =>
  p.a !== 0
    ? {
        ...p,
        t: p.t + p.a,
        a: 0,
        z: p.z - p.a,
        c1y: p.c1y - p.a,
        c2y: p.c2y - p.a,
      }
    : p

const SvgBlob: React.FC<SvgBlobProps> = ({
  color,
  path: p,
  className,
  onPathChange,
  // onRemove,
}) => {
  // const [dragWithMiddleButton, setDragWithMiddleButton] = useState(false)
  const [dragIndex, setDragIndex] = useState<'a' | 'z' | 'c1' | 'c2' | null>(
    null
  )
  // const [p, setP] = useState<Path>(initialPath)
  // const aa = a + top
  // const zz = z + top
  // const cc1 = [c1[0], c1[1] + top] as Point
  // const cc2 = [c2[0], c2[1] + top] as Point

  const controlsRef = useRef<HTMLDivElement>(null)

  function drag(ev: MouseEvent) {
    const rect = controlsRef?.current?.getBoundingClientRect()
    if (rect && onPathChange && dragIndex != null) {
      const x = ((ev.clientX - rect.x) / rect.width) * SVG_W
      const y = ev.clientY - rect.y - p.t

      switch (dragIndex) {
        case 'a':
          return onPathChange(adjustTop({ ...p, a: y }))
        case 'z':
          return onPathChange({ ...p, z: y })
        case 'c1':
          return onPathChange({ ...p, c1x: x, c1y: y })
        case 'c2':
          return onPathChange({ ...p, c2x: x, c2y: y })
      }
    }
  }

  const finishDrag = () => setDragIndex(null)

  useEffect(() => {
    if (dragIndex != null) {
      window.addEventListener('mousemove', drag)
      window.addEventListener('mouseup', finishDrag)
      window.document.body.style.userSelect = 'none'
      return () => {
        window.removeEventListener('mousemove', drag)
        window.removeEventListener('mouseup', finishDrag)
        window.document.body.style.userSelect = ''
      }
    } else {
      // submitChange()
    }
  }, [dragIndex])

  return (
    <div
      className={cx('absolute inset-x-0 top-0 text-opacity-85', className)}
      style={{ height: SVG_H + p.t }}
    >
      <div className="absolute inset-0" ref={controlsRef}>
        {/* {pp.map((p, i) => (
          <Handler
            p={p}
            index={i}
            key={i}
            onMouseDown={() => startDragging(i)}
          />
        ))} */}
        <VHandler
          y={p.a + p.t}
          active={dragIndex === 'a'}
          onMouseDown={() => setDragIndex('a')}
        />
        <VHandler
          y={p.z + p.t}
          active={dragIndex === 'z'}
          right
          onMouseDown={() => setDragIndex('z')}
        />
        <Handler
          x={p.c1x}
          y={p.c1y + p.t}
          active={dragIndex === 'c1'}
          onMouseDown={() => setDragIndex('c1')}
        />
        <Handler
          x={p.c2x}
          y={p.c2y + p.t}
          active={dragIndex === 'c2'}
          onMouseDown={() => setDragIndex('c2')}
        />
      </div>
      <div
        className={cx('absolute inset-0 z-10 pointer-events-none')}
        style={{ color }}
      >
        <svg
          width={SVG_W}
          height={SVG_H + p.t}
          className="relative md:w-full md:h-full svg-positioning"
          viewBox={`0 0 ${SVG_W} ${SVG_H + p.t}`}
          preserveAspectRatio="none"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`
            M0 ${p.a + p.t}
            C ${p.c1x} ${p.c1y + p.t}, ${p.c2x} ${p.c2y + p.t}, ${SVG_W} ${
              p.z + p.t
            }
            L${SVG_W} 0
            L0 0
            Z`}
            strokeOpacity="0"
            onClick={() => {
              console.log('ARSARS')
            }}
          />
          <Line p1={[0, p.a + p.t]} p2={[p.c1x, p.c1y + p.t]} />
          <Line p1={[SVG_W, p.z + p.t]} p2={[p.c2x, p.c2y + p.t]} />
        </svg>
      </div>
    </div>
  )
}

const Handler = ({
  x,
  y,
  onMouseDown,
  active,
}: {
  x: number
  y: number
  onMouseDown: () => void
  active: boolean
}) => (
  <div
    className={cx(
      `hidden md:block
      absolute h-2 w-2 -mt-1 -ml-1 rounded-full z-30
      transition-transform duration-100 box-content
       cursor-move opacity-75 bg-red-600 border-opacity-50`,
      { 'transform scale-150 opacity-100 border-2 border-red-500': active }
    )}
    onMouseDown={onMouseDown}
    style={{
      left: `${(x / SVG_W) * 100}%`,
      top: `${y}px`,
    }}
  ></div>
)

const VHandler = ({
  y,
  onMouseDown,
  right,
  active,
}: {
  y: number
  right?: boolean
  onMouseDown: () => void
  active: boolean
}) => (
  <div
    className={cx(
      `hidden md:block
      absolute h-2 -mt-2 w-4 z-30
      opacity-100 bg-gray-300 transition-transform duration-100`,
      {
        'rounded-l-full': right,
        'rounded-r-full': !right,
        'transform scale-150': active,
      }
    )}
    onMouseDown={onMouseDown}
    style={{
      cursor: 'row-resize',
      [right ? 'right' : 'left']: `0`,
      top: `${y}px`,
    }}
  ></div>
)

const Line = ({ p1, p2 }: { p1: Point; p2: Point }) => (
  <path
    className="hidden md:block"
    stroke="rgba(0,0,0,0.86)"
    strokeWidth="0.1%"
    d={`M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]}`}
  />
)

export default SvgBlob
