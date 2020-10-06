import React, { useState, useEffect, useRef } from 'react'
import _ from 'lodash'
import cx from 'classnames'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const Header: React.FC<HeaderProps> = () => {
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
      <div className="relative">
        <Link
          to="/"
          className="relative shadow-md block rounded-full overflow-hidden z-20"
        >
          <Img
            style={{ display: 'block' }}
            title="I love this picture"
            fixed={profile.file.childImageSharp.fixed}
            imgStyle={{ objectFit: 'cover' }}
          />
        </Link>
        <RainbowCircle />
      </div>
    </header>
  )
}

const SLICES = 16
const MIN_RADIUS = Math.round(((100 / 124) * 100) / 2)
const MAX_RADIUS = MIN_RADIUS + 50 - MIN_RADIUS
const RainbowCircle: React.FC<unknown> = () => {
  const [rotation, setRotation] = useState(_.random(360))
  const [initialHue, setInitialHue] = useState(_.random(360))
  const [slices, setSlices] = useState(
    [...Array(SLICES)].map(() => _.random(MIN_RADIUS, MAX_RADIUS, true))
  )
  const rad = (Math.PI * 2) / SLICES
  const hue = 360 / SLICES

  return (
    <svg
      className={cx('absolute inset-0 -m-6 transform z-10')}
      viewBox={`-50 -50 100 100`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {slices.map((radius, i) => (
        <Slice
          key={i}
          r={radius}
          a1={rotation + i * rad}
          a2={rotation + (i + 1) * rad}
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
