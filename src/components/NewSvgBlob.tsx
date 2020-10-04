import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { Point, Points, clone } from './Points'

export const SVG_W = 1000
export const SVG_H = 500

export type SvgBlobType = {
  id: number
  top: number
  path: Points
  color: string
  onRemove?: () => void
  className?: string
  onChange?: (props: SvgBlobType) => void
}

const SvgBlob: React.FC<SvgBlobType> = ({
  top,
  color,
  id,
  path: initialPath,
  className,
  onChange,
  onRemove,
}) => {
  const [dragWithMiddleButton, setDragWithMiddleButton] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [path, setP] = useState<Points>(initialPath)
  const [a, z, c1, c2] = path
  const aa = a + top
  const zz = z + top
  const cc1 = [c1[0], c1[1] + top] as Point
  const cc2 = [c2[0], c2[1] + top] as Point

  const controlsRef = useRef<HTMLDivElement>(null)

  function submitChange() {
    if (onChange) {
      if (path[0] !== 0) {
        const dy = path[0]
        const newPath = clone(path)
        newPath[0] -= dy
        newPath[1] -= dy
        newPath[2][1] -= dy
        newPath[3][1] -= dy
        setP(newPath)
        onChange({ id, color, top: top + dy, path: newPath })
      } else {
        onChange({ id, color, top, path })
      }
    }
  }

  function drag(ev: MouseEvent) {
    const rect = controlsRef?.current?.getBoundingClientRect()
    if (rect && dragIndex != null) {
      const newPoint = [
        ((ev.clientX - rect.x) / rect.width) * SVG_W,
        ev.clientY - rect.y - top,
      ] as Point

      setP((oldPath) => {
        const newPath: Points = [...oldPath]
        const oldPoint = newPath[dragIndex]
        newPath[dragIndex] =
          typeof oldPoint === 'number' ? newPoint[1] : newPoint
        return newPath
      })
    }
  }

  function finishDrag() {
    setDragIndex(null)
  }

  useEffect(() => {
    if (dragIndex != null) {
      window.addEventListener('mousemove', drag)
      window.addEventListener('mouseup', finishDrag)
      window.document.body.style.userSelect = 'none'
      return () => {
        console.log('Unmount!')
        window.removeEventListener('mousemove', drag)
        window.removeEventListener('mouseup', finishDrag)
        window.document.body.style.userSelect = ''
      }
    } else {
      submitChange()
    }
  }, [dragIndex])

  return (
    <div
      className={cx('absolute inset-x-0 top-0 text-opacity-85', className)}
      style={{ height: SVG_H + top }}
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
          p={aa}
          active={dragIndex === 0}
          onMouseDown={() => setDragIndex(0)}
        />
        <VHandler
          p={zz}
          active={dragIndex === 1}
          right
          onMouseDown={() => setDragIndex(1)}
        />
        <Handler
          p={cc1}
          active={dragIndex === 2}
          onMouseDown={() => setDragIndex(2)}
        />
        <Handler
          p={cc2}
          active={dragIndex === 3}
          onMouseDown={() => setDragIndex(3)}
        />
      </div>
      <div className={cx('absolute inset-0 z-10 pointer-events-none', color)}>
        <svg
          width={SVG_W}
          height={SVG_H + top}
          className="relative md:w-full md:h-full svg-positioning"
          viewBox={`0 0 ${SVG_W} ${SVG_H + top}`}
          preserveAspectRatio="none"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`
            M0 ${aa}
            C ${cc1[0]} ${cc1[1]}, ${cc2[0]} ${cc2[1]}, ${SVG_W} ${zz}
            L${SVG_W} 0
            L0 0
            Z`}
            strokeOpacity="0"
            onClick={() => {
              console.log('ARSARS')
            }}
          />
          <Line p1={[0, aa]} p2={cc1} />
          <Line p1={[SVG_W, zz]} p2={cc2} />
        </svg>
      </div>
    </div>
  )
}

const Handler = ({
  p,
  onMouseDown,
  active,
}: {
  p: [number, number]
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
      left: `${(p[0] / SVG_W) * 100}%`,
      top: `${p[1]}px`,
    }}
  ></div>
)

const VHandler = ({
  p,
  onMouseDown,
  right,
  active,
}: {
  p: number
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
      top: `${p}px`,
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
