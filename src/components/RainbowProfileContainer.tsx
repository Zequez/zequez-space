import React, { useState, useEffect, useRef } from 'react'
import cx from 'classnames'
import _ from 'lodash'
import { Link } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import { onMultiDeviceHoverLeave } from '@/lib/utils'
import RainbowProfile from './RainbowProfile'

interface RainbowProfileContainerProps {
  image: FixedObject
  to: string
  imageSize?: number
}

// Display
const MIN_BORDER = 4
const MAX_BORDER = 28
const SLICES = 16

// Animation
const ROTATION_SECONDS = 10
const HUE_ROT_SECONDS = 3
const UP_DOWN_SECONDS = 2

const slicesDirections = [...Array(SLICES)].map(() => Math.random() > 0.5)

const RainbowProfileContainer: React.FC<RainbowProfileContainerProps> = ({
  image,
  to,
}) => {
  const [{ rotation, hue, slices }, setState] = useState(() => ({
    rotation: _.random(Math.PI * 2),
    hue: _.random(360),
    slices: [...Array(SLICES)].map(() => Math.random()),
  }))
  const [animate, setAnimate] = useState(false)
  const raf = useRef()

  useAnimation(raf, animate, (dt) => {
    const radFract = dt / (ROTATION_SECONDS * 1000)
    const radAdd = Math.PI * 2 * radFract
    const hueFract = dt / (HUE_ROT_SECONDS * 1000)
    const hueAdd = -(360 * hueFract)
    const sliceAdd = dt / (UP_DOWN_SECONDS * 1000)
    setState(({ slices }) => {
      return {
        rotation: rotation + radAdd,
        hue: (hue + hueAdd) % 360,
        slices: slices.map((size, i) => {
          let newSize = size + (slicesDirections[i] ? sliceAdd : -sliceAdd)
          if (newSize > 1) {
            newSize = 1 - newSize + 1
            slicesDirections[i] = !slicesDirections[i]
          } else if (newSize < 0) {
            newSize = -newSize
            slicesDirections[i] = !slicesDirections[i]
          }
          return newSize
        }),
      }
    })
    // setRotation((initialRad) => initialRad + radAdd)
    // setHue((initialHue) => (initialHue + hueAdd) % 360)
    // setSlices((slices) =>

    // )
  })

  return (
    <Link to={to} className="relative no-tap-highlight">
      <MemoImage image={image} active={animate} onHoverChange={setAnimate} />
      <RainbowProfile
        slices={slices}
        rotation={rotation}
        hue={hue}
        minBorder={MIN_BORDER}
        maxBorder={MAX_BORDER}
        scale={animate ? 1.1 : 1}
      />
    </Link>
  )
}

const Image: React.FC<{
  active: boolean
  onHoverChange: (hover: boolean) => void
  image: FixedObject
}> = ({ active, onHoverChange, image }) => (
  <div
    className={cx(
      `relative shadow-md block rounded-full z-20 overflow-hidden
          transition-opacity duration-300`,
      { 'opacity-75': active }
    )}
    {...onMultiDeviceHoverLeave(
      () => onHoverChange(true),
      () => onHoverChange(false)
    )}
  >
    <Img
      style={{ display: 'block' }}
      title="I love this picture"
      fixed={image}
      imgStyle={{ objectFit: 'cover' }}
    />
  </div>
)

const MemoImage = React.memo(Image)

function useAnimation(
  ref: { current: number | null },
  animate: boolean,
  cb: (dt: number) => void
) {
  return useEffect(() => {
    if (ref.current !== null) {
      window.cancelAnimationFrame(ref.current)
      ref.current = null
    }

    if (animate && ref.current === null) {
      let start = 0
      const rotate = () => {
        window.requestAnimationFrame((timestamp) => {
          if (ref.current !== null) {
            if (start === 0) {
              start = timestamp
            }
            const dt = timestamp - start
            start = timestamp
            if (dt > 0) {
              cb(dt)
            }
            ref.current = window.requestAnimationFrame(rotate)
          }
        })
      }
      ref.current = window.requestAnimationFrame(rotate)
      return () => {
        if (ref.current !== null) {
          window.cancelAnimationFrame(ref.current)
          ref.current = null
        }
      }
    }
  }, [animate])
}

export default RainbowProfileContainer
