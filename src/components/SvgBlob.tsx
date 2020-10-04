import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'

const SVG_W = 500
const SVG_H = 400

type Point = [number, number]
type Points = [Point, Point, Point, Point, Point, Point, Point, Point]

export type SvgBlobType = {
  top: number
  path: Points
  color: string
  className?: string
  onChange?: (props: SvgBlobType) => void
}

const translateWH = (pp: Points): Points =>
  pp.map((p) => [(p[0] * SVG_W) / 100, (p[1] * SVG_H) / 100]) as Points

// const translateWHBack = (pp: Points): Points =>
//   pp.map(([x, y]) => [(x * 100) / SVG_W, (y * 100) / SVG_H]) as Points

const SvgBlob: React.FC<SvgBlobType> = ({
  top,
  color,
  path,
  className,
  onChange,
}) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [pp, setP] = useState<Points>(path)
  const [a1, a2, z1, z2, c1, c2, c3, c4] = translateWH(pp)
  const controlsRef = useRef<HTMLDivElement>(null)

  function startDragging(index: number) {
    setDragIndex(index)
  }

  function continueDragging(ev: MouseEvent) {
    if (dragIndex) {
      const newDrag = [ev.clientX, ev.clientY]
      const rect = controlsRef?.current?.getBoundingClientRect()
      if (rect) {
        const px = ((newDrag[0] - rect.x) / rect.width) * 100
        const py = ((newDrag[1] - rect.y) / rect.height) * 100
        const newPp: Points = [...pp]
        const noDragX = dragIndex <= 3
        newPp[dragIndex] = [noDragX ? newPp[dragIndex][0] : px, py]
        setP(newPp)
      }
    }
  }

  function finishDragging() {
    if (dragIndex) {
      setDragIndex(null)
    }
  }

  function submitChange() {
    if (onChange) {
      onChange({ top, color, path: pp })
    }
  }

  useEffect(() => {
    if (dragIndex) {
      window.addEventListener('mousemove', continueDragging)
      window.addEventListener('mouseup', finishDragging)
      return () => {
        window.removeEventListener('mousemove', continueDragging)
        window.removeEventListener('mouseup', finishDragging)
      }
    } else {
      submitChange()
    }
  }, [dragIndex])

  return (
    <div
      className={cx('absolute w-full text-opacity-85', className)}
      style={{ top: `${top}px`, height: SVG_H }}
    >
      <div className="absolute inset-0" ref={controlsRef}>
        {pp.map((p, i) => (
          <Handler
            p={p}
            index={i}
            key={i}
            onMouseDown={() => startDragging(i)}
          />
        ))}
      </div>
      <div className={cx('absolute inset-0 z-10 pointer-events-none', color)}>
        <svg
          width={SVG_W}
          height={SVG_H}
          className="w-full h-full"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="none"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`
            M${a1[0]} ${a1[1]}
            C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${z1[0]} ${z1[1]}
            L${z2[0]} ${z2[1]}
            C ${c3[0]} ${c3[1]}, ${c4[0]} ${c4[1]}, ${a2[0]} ${a2[1]}
            Z`}
          />
          <Line p1={a1} p2={c1} />
          <Line p1={a2} p2={c4} />
          <Line p1={z1} p2={c2} />
          <Line p1={z2} p2={c3} />
        </svg>
      </div>
    </div>
  )
}

const Handler = ({
  p,
  index,
  onMouseDown,
}: {
  p: [number, number]
  index: number
  onMouseDown: () => void
}) => (
  <div
    className={cx(
      `absolute h-2 w-2 -mt-1 z-30
    cursor-pointer opacity-75 bg-red-600`,
      {
        'rounded-full bg-red-600 -ml-1 ': index > 3,
        'bg-black': index <= 3,
        '-ml-2 rounded-l-full': index === 2 || index === 3,
        'rounded-r-full': index === 0 || index === 1,
      }
    )}
    onMouseDown={onMouseDown}
    style={{
      left: `${p[0]}%`,
      top: `${p[1]}%`,
    }}
  ></div>
)

const Line = ({ p1, p2 }: { p1: Point; p2: Point }) => (
  <svg
    width={SVG_W}
    height={SVG_H}
    className="w-full h-full"
    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
    preserveAspectRatio="none"
    fill="transparent"
    stroke="rgba(0,0,0,0.86)"
    strokeWidth="0.1%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={`M${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]}`} />
  </svg>
)

export default SvgBlob
