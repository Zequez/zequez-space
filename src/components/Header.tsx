import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import cx from 'classnames'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const Header: React.FC<HeaderProps> = () => {
  const [animate, setAnimate] = useState(false)
  const profile = useStaticQuery(graphql`
    query ProfileImage {
      file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          fixed(width: 160, height: 160) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <header className={`p-4 pb-8 container mx-auto flex justify-center z-30`}>
      <Link to="/" className="relative">
        <div
          className="relative shadow-md block rounded-full
          overflow-hidden z-20 transition-opacity duration-300 hover:opacity-75"
          onMouseOver={() => setAnimate(true)}
          onMouseLeave={() => setAnimate(false)}
        >
          <Img
            style={{ display: 'block' }}
            title="I love this picture"
            fixed={profile.file.childImageSharp.fixed}
            imgStyle={{ objectFit: 'cover' }}
          />
        </div>
        <RainbowCircle animate={animate} />
      </Link>
    </header>
  )
}

const SLICES = 16
const MIN_RADIUS = Math.round(((100 / 124) * 100) / 2)
const MAX_RADIUS = MIN_RADIUS + 50 - MIN_RADIUS
const ROTATION_SECONDS = 10
const HUE_ROT_SECONDS = 3
const UP_DOWN_SECONDS = 2
const RainbowCircle: React.FC<{ animate: boolean }> = ({ animate }) => {
  const [initialRad, setRotation] = useState(_.random(Math.PI * 2))
  const [initialHue, setInitialHue] = useState(_.random(360))
  const [slices, setSlices] = useState(
    [...Array(SLICES)].map(() => _.random(MIN_RADIUS, MAX_RADIUS, true))
  )
  const rad = (Math.PI * 2) / SLICES
  const hue = 360 / SLICES

  useEffect(() => {
    if (animate) {
      let start = 0
      const slicesDirections = [...Array(SLICES)].map(
        (_, i) => Math.random() > 0.5
      )
      const rotate = () => {
        window.requestAnimationFrame((timestamp) => {
          if (start === 0) {
            start = timestamp
          }
          const dt = timestamp - start
          start = timestamp
          if (dt > 0) {
            const radFract = dt / (ROTATION_SECONDS * 1000)
            const radAdd = Math.PI * 2 * radFract
            const hueFract = dt / (HUE_ROT_SECONDS * 1000)
            const hueAdd = -(360 * hueFract)
            const sliceFract = dt / (UP_DOWN_SECONDS * 1000)
            const sliceAdd = (MAX_RADIUS - MIN_RADIUS) * sliceFract
            setRotation((initialRad) => initialRad + radAdd)
            setInitialHue((initialHue) => (initialHue + hueAdd) % 360)
            setSlices((slices) =>
              slices.map((size, i) => {
                let newSize =
                  size + (slicesDirections[i] ? sliceAdd : -sliceAdd)
                if (newSize > MAX_RADIUS) {
                  newSize = MAX_RADIUS - (newSize - MAX_RADIUS)
                  slicesDirections[i] = !slicesDirections[i]
                } else if (newSize < MIN_RADIUS) {
                  newSize = MIN_RADIUS - newSize + MIN_RADIUS
                  slicesDirections[i] = !slicesDirections[i]
                }
                return newSize
              })
            )
          }
        })
      }
      const interval = setInterval(rotate, 1000 / 60)
      return () => clearInterval(interval)
    }
  }, [animate])

  return (
    <svg
      className={cx(
        'absolute inset-0 -m-6 transform transition-transform duration-150 z-10',
        {
          'scale-110': animate,
        }
      )}
      viewBox={`-50 -50 100 100`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {slices.map((radius, i) => (
        <Slice
          key={i}
          r={radius}
          a1={initialRad + i * rad}
          a2={initialRad + (i + 1) * rad}
          hue={(initialHue + hue * i) % 360}
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
}> = ({ r, a1, a2, hue }) => {
  return (
    <path
      d={`M0 0 L ${cos(a1) * r} ${sin(a1) * r} L ${cos(a2) * r} ${
        sin(a2) * r
      } Z`}
      style={{ fill: `hsl(${hue}, 75%, 45%)` }}
    />
  )
}

export default Header
