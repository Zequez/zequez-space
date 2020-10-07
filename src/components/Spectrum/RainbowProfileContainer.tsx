import React, { useState, useEffect, useRef, useContext } from 'react'
import cx from 'classnames'
import _ from 'lodash'
import { Link } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import { observer } from 'mobx-react-lite'
import { StoreContext } from './store'
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

const RainbowProfileContainer: React.FC<RainbowProfileContainerProps> = observer(
  ({ image, to }) => {
    const {
      profile: { rotation, hue, slices, animating },
      setProfileAnimation,
      plainMode,
      isDarkMode,
    } = useContext(StoreContext)

    return (
      <Link to={to} className="relative no-tap-highlight">
        <MemoImage
          image={image}
          active={animating}
          onHoverChange={setProfileAnimation}
        />
        {!plainMode && (
          <RainbowProfile
            slices={slices}
            rotation={rotation}
            hue={hue}
            minBorder={MIN_BORDER}
            maxBorder={MAX_BORDER}
            darkMode={isDarkMode}
            scale={animating ? 1.1 : 1}
          />
        )}
      </Link>
    )
  }
)

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
