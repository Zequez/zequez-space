import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { reverseMap } from '@/lib/utils'
import SvgBlob, { Path } from './NewSvgBlob'
const blobsStore: Record<string, StorageBlobs> = require('@/data/blobs.json')

type StorageBlobs = {
  timestamp: number
  blobs: Blob[]
}

type Blob = {
  id: number
  path: Path
  hue: number
}

const LOCAL_STORAGE_PREFIX = '_blobs4_'
const HUE_RANGE = 300

const MEDIA_QUERIES = [
  'block sm:hidden',
  'hidden sm:block lg:hidden',
  'hidden lg:block',
]

type Actions =
  | { type: 'UpdatePath'; id: number; path: Blob['path'] }
  | { type: 'AddNewBlob'; top: number }
  | { type: 'RemoveBlob'; id: number }
  | { type: 'Save' }
  | { type: 'CleanLocal' }
  | { type: 'Init' }

type State = {
  storageKey: string
  current: StorageBlobs
  editing: null | string
  hue: number
  saturation: number
  lightness: number
}

function initialize(blobsKey: string): State {
  const localRaw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${blobsKey}`)
  const local =
    ((localRaw && JSON.parse(localRaw)) as StorageBlobs) || newStorageBlob()
  const initial = blobsStore[blobsKey] || newStorageBlob()
  const loadFrom = local.timestamp > initial.timestamp ? local : initial
  return {
    storageKey: blobsKey,
    current: loadFrom,
    editing: null,
    hue: 60,
    saturation: 50,
    lightness: 50,
  }
}

const reducer = (state: State, action: Actions) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Reduce:', action.type, action, state)
  }

  switch (action.type) {
    case 'UpdatePath': {
      const blobIndex = state.current.blobs.findIndex((v) => v.id === action.id)
      if (blobIndex !== -1) {
        const blobs = state.current.blobs.slice(0)
        blobs.splice(blobIndex, 1, {
          ...blobs[blobIndex],
          path: action.path,
        })
        return {
          ...state,
          current: {
            timestamp: +new Date(),
            blobs,
          },
        }
      } else {
        return state
      }
    }
    case 'AddNewBlob': {
      // const color = automaticHue(state.current.blobs, action.top)
      const blob = newBlob(action.top, 0)

      return {
        ...state,
        current: {
          timestamp: +new Date(),
          blobs: adjustHues(
            [...state.current.blobs, blob].sort((a, b) => a.path.t - b.path.t)
          ),
        },
      }
    }
    case 'RemoveBlob':
      return state
    case 'Save':
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}${state.storageKey}`,
        JSON.stringify(state.current)
      )
      return state
    case 'CleanLocal':
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${state.storageKey}`)
      return initialize(state.storageKey)
    case 'Init':
      return state
    default:
      throw new Error('never')
  }
}

const useBlobs = (blobsKey: string): [State, (action: Actions) => void] => {
  const [state, setState] = useState<State>(() => initialize(blobsKey))
  return [
    state,
    (action: Actions) =>
      setState((newestState) => reducer(newestState, action)),
  ]
}

const SvgBlobsList: React.FC<{ blobsKey: string }> = ({ blobsKey }) => {
  const [{ current, saturation, lightness }, run] = useBlobs(blobsKey)

  function addNewBlobOnPoint(ev: MouseEvent) {
    run({
      type: 'AddNewBlob',
      top: ev.pageY,
    })
  }

  function removeBlob(index: number) {
    // console.log('REMOVE!')
    // const newBlobs = blobs.concat([])
    // newBlobs.splice(index, 1)
    // setDynamicBlobs({ timestamp: +new Date(), blobs: newBlobs })
  }

  useEffect(() => {
    // function checkClick(ev: MouseEvent) {
    //   console.log('dblclick', ev.clientY)
    // }
    window.addEventListener('dblclick', addNewBlobOnPoint)
    return () => {
      window.removeEventListener('dblclick', addNewBlobOnPoint)
    }
  }, [current.blobs.length])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {reverseMap(current.blobs, (blob, i) => (
        <SvgBlob
          key={blob.id}
          color={genColor(blob.hue, saturation, lightness)}
          path={blob.path}
          onPathChange={(path) =>
            run({ type: 'UpdatePath', path, id: blob.id })
          }
        />
      ))}
      {/* <div className="absolute inset-0 z-10" onClick={addNewBlobOnPoint}></div> */}
      <div
        className="fixed bottom-0 inset-x-0 h-8 bg-black bg-opacity-50 z-50
        flex items-center justify-center text-white text-xs"
      >
        BG Editor
        <Button onClick={() => run({ type: 'CleanLocal' })}>Clean all</Button>
        <Button onClick={() => run({ type: 'Save' })}>Save</Button>
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

export default SvgBlobsList

/* Types Utils */

const newStorageBlob = (): StorageBlobs => ({
  timestamp: 0,
  blobs: [],
})

const newBlob = (t = 300, hue: number = _.random(0, 360)): Blob => ({
  id: randomId(),
  path: {
    t,
    a: _.random(-100, 100),
    z: _.random(-100, 100),
    c1x: _.random(100, 700),
    c1y: _.random(-100, 100),
    c2x: _.random(300, 900),
    c2y: _.random(-100, 100),
  },
  hue,
})

const randomId = () => Math.round(Math.random() * 1000000)
const randomColor = (fromHue?: number, toHue?: number) => {
  if (fromHue != null && toHue != null) {
    let toAbs = toHue
    if (fromHue > toHue) {
      toAbs = Math.abs(toAbs - 360)
    }

    const dx = toAbs - fromHue
    return (
      _.random(Math.round(fromHue + dx * 0.2), Math.round(toAbs - dx * 0.2)) %
      360
    )
  } else if (fromHue != null) {
    return (fromHue + _.random(30, 60)) % 360
  } else {
    return _.random(360)
  }
}
// const parseColorHue = (s: string): number => {
//   const m = s.match(/^hsl\(([0-9]+)/)
//   return (m && parseInt(m[1])) || 0
// }
const adjustHues = (blobs: Blob[]): Blob[] => {
  // const height = document.scrollingElement.scrollHeight
  const space = blobs.length > 0 ? Math.round(HUE_RANGE / blobs.length) : 0
  return blobs.map((blob, i) => ({ ...blob, hue: space * i }))
}
const genColor = (hue: number, saturation: number, lightness: number): string =>
  `hsl(${hue}, ${saturation}%, ${lightness}%)`

const automaticHue = (blobs: Blob[], top: number): number => {
  if (blobs.length > 0) {
    console.log('Blobs > 0')
    const nextBlobIndex = blobs.findIndex((b) => b.path.t > top)
    if (nextBlobIndex === -1) {
      console.log('No next blob')
      return randomColor(blobs[blobs.length - 1].hue)
    } else if (nextBlobIndex === 0) {
      console.log('Next blob is first')
      return randomColor(blobs[0].hue - 60)
    } else {
      console.log('In between blobs')
      return randomColor(blobs[nextBlobIndex - 1].hue, blobs[nextBlobIndex].hue)
    }
  } else {
    console.log('No blobs')
    return randomColor()
  }
}
