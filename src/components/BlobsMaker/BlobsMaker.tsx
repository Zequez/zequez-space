import React from 'react'
import cx from 'classnames'
import { reverseMap } from '@/lib/utils'
import { SVG_W, Path, Blob } from './store'

interface BlobsMakerProps {
  blobs: Blob[]
  saturation: number
  lightness: number
  hue: number
  height: number
  width: number
}

const BlobsMaker: React.FC<BlobsMakerProps> = ({
  blobs,
  saturation,
  lightness,
  hue,
  height,
  width,
}) => {
  const lastBlob = blobs[blobs.length - 1]
  const innerBgColor = genColor(
    lastBlob ? lastBlob.hue + (30 % 360) : hue,
    saturation,
    lightness
  )
  const outerBgColor = genColor(
    lastBlob ? lastBlob.hue + (180 % 360) : hue,
    saturation - 10,
    lightness - 5
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="relative mx-auto z-20 sm:shadow-lg"
        style={{ maxWidth: 512, backgroundColor: innerBgColor }}
      >
        <Svg height={height} width={512}>
          {reverseMap(blobs, (blob, i) => (
            <SvgPath
              key={i}
              color={genColor(blob.hue, saturation, lightness)}
              path={blob.path}
            />
          ))}
        </Svg>
      </div>
      {width > 512 ? (
        <div
          className="absolute z-10 inset-0 overflow-hidden"
          style={{
            backgroundColor: outerBgColor,
          }}
        >
          <Svg height={height} width={width}>
            {reverseMap(blobs, (blob, i) => (
              <SvgPath
                key={i}
                color={genColor(
                  (blob.hue + 180) % 360,
                  saturation - 10,
                  lightness - 5
                )}
                path={blob.path}
              />
            ))}
          </Svg>
        </div>
      ) : null}
    </div>
  )
}

const Svg: React.FC<{ height: number; width: number }> = ({
  children,
  height,
  width,
}) => (
  <svg
    height={height}
    width={width}
    className={cx('relative svg-centering')}
    viewBox={`0 0 ${SVG_W} ${height}`}
    preserveAspectRatio="none"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
)

const SvgPath: React.FC<{ path: Path; color: string }> = ({
  path: p,
  color,
}) => (
  <path
    d={`
      M0 ${p.a + p.t}
      C ${p.c1x} ${p.c1y + p.t}, ${p.c2x} ${p.c2y + p.t}, ${SVG_W} ${p.z + p.t}
      L${SVG_W} 0
      L0 0
      Z`}
    style={{ fill: color }}
    strokeOpacity="0"
  />
)

export default BlobsMaker

// ██╗   ██╗████████╗██╗██╗     ███████╗
// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
// ██║   ██║   ██║   ██║██║     ███████╗
// ██║   ██║   ██║   ██║██║     ╚════██║
// ╚██████╔╝   ██║   ██║███████╗███████║
//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

const genColor = (hue: number, saturation: number, lightness: number): string =>
  `hsl(${hue}, ${saturation}%, ${lightness}%)`
