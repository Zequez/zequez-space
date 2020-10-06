import React, { useEffect } from 'react'
import cx from 'classnames'
import _ from 'lodash'
import { reverseMap } from '@/lib/utils'
import { useReducer, Path } from './store'

const BlobsMaker: React.FC<{ blobsKey: string }> = ({ blobsKey }) => {
  const [
    { blobs, saturation, lightness, hue, height, width },
    run,
  ] = useReducer(blobsKey)

  // function addNewBlobOnPoint(ev: MouseEvent) {
  //   run({
  //     type: 'AddNewBlob',
  //     top: ev.pageY,
  //   })
  // }

  useEffect(() => {
    run({ type: 'Regenerate' })
  }, [])

  // useEffect(() => {
  //   window.addEventListener('dblclick', addNewBlobOnPoint)
  //   return () => {
  //     window.removeEventListener('dblclick', addNewBlobOnPoint)
  //   }
  // }, [blobs.length])

  const lastBlob = blobs[blobs.length - 1]
  const bgColor = genColor(
    lastBlob ? lastBlob.hue + (30 % 360) : hue,
    saturation,
    lightness
  )

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="relative mx-auto z-20 sm:shadow-lg"
        style={{ maxWidth: 512 }}
      >
        <Svg height={height} width={512}>
          {reverseMap(blobs, (blob, i) => (
            <SvgPath
              key={blob.id}
              color={genColor(blob.hue, saturation, lightness)}
              path={blob.path}
            />
          ))}
        </Svg>
      </div>
      {width > 512 ? (
        <div className="absolute top-0 inset-x-0 z-10">
          <Svg height={height} width={width}>
            {reverseMap(blobs, (blob, i) => (
              <SvgPath
                key={blob.id}
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

      {/* <div className="absolute inset-0 z-10" onClick={addNewBlobOnPoint}></div> */}
      <div
        className="fixed bottom-0 inset-x-0 h-8 bg-black bg-opacity-50 z-50
        flex items-center justify-center text-white text-xs"
      >
        BG Editor
        <Button onClick={() => run({ type: 'CleanLocal' })}>Clean all</Button>
        <Button onClick={() => run({ type: 'Save' })}>Save</Button>
        <Button onClick={() => run({ type: 'Regenerate' })}>Regenerate</Button>
        <Button onClick={() => run({ type: 'DarkToggle' })}>Toggle Dark</Button>
      </div>
    </div>
  )
}

const Button: React.FC<{ onClick: () => void }> = ({ onClick, children }) => (
  <button
    className="bg-gray-500 p-1 mx-1 rounded-md text-black"
    onClick={onClick}
  >
    {children}
  </button>
)

const Svg: React.FC<{ height: number; width?: number }> = ({
  children,
  height,
  width,
}) => (
  <svg
    height={height}
    width={width}
    className={cx('relative svg-centering')}
    viewBox={`0 0 500 ${height}`}
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
      C ${p.c1x} ${p.c1y + p.t}, ${p.c2x} ${p.c2y + p.t}, 500 ${p.z + p.t}
      L500 0
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
