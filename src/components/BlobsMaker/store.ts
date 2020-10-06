import { useState } from 'react'
import _ from 'lodash'

const LOCAL_STORAGE_PREFIX = '_blobs4_'
const HUE_RANGE = 300
const DEFAULT_LIGHT = 50
const DARK_MODE_LIGHT = 15

type Actions =
  | { type: 'Regenerate' }
  | { type: 'UpdatePath'; id: number; path: Blob['path'] }
  | { type: 'AddNewBlob'; top: number }
  | { type: 'RemoveBlob'; id: number }
  | { type: 'Save' }
  | { type: 'Clean' }
  | { type: 'DarkToggle' }

export type Blob = {
  id: number
  path: Path
  hue: number
}

export type Path = {
  t: number // top
  a: number // left handle
  z: number // right handle
  c1x: number // control 1 x
  c1y: number // control 1 y
  c2x: number // control 2 x
  c2y: number // control 2 y
}

export type State = {
  storageKey: string
  blobs: Blob[]
  height: number
  width: number
  hue: number
  saturation: number
  lightness: number
  controlsVisible: boolean
}

export function initialize(blobsKey: string): State {
  const localRaw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${blobsKey}`)
  const local = localRaw && JSON.parse(localRaw)
  const blobs: Blob[] = local && local.length != null ? (local as Blob[]) : []
  return {
    storageKey: blobsKey,
    blobs,
    height: 2000,
    width: 1000,
    hue: _.random(360),
    saturation: 50,
    lightness: DEFAULT_LIGHT,
    controlsVisible: true,
  }
}

export const useReducer = (
  ...args: Parameters<typeof initialize>
): [State, (action: Actions) => void] => {
  const [state, setState] = useState<State>(() => initialize(...args))
  return [
    state,
    (action: Actions) =>
      setState((newestState) => reducer(newestState, action)),
  ]
}

// ██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗███████╗██████╗
// ██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝██╔══██╗
// ██████╔╝█████╗  ██║  ██║██║   ██║██║     █████╗  ██████╔╝
// ██╔══██╗██╔══╝  ██║  ██║██║   ██║██║     ██╔══╝  ██╔══██╗
// ██║  ██║███████╗██████╔╝╚██████╔╝╚██████╗███████╗██║  ██║
// ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚══════╝╚═╝  ╚═╝

export const reducer = (state: State, action: Actions) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Reduce:', action.type, action, state)
  }

  switch (action.type) {
    case 'Regenerate': {
      const hue = (state.hue + _.random(30)) % 360
      const height = document.body.scrollHeight
      const width = document.body.scrollWidth
      return {
        ...state,
        hue,
        height,
        width,
        blobs: generateBlobs(hue, height, width, 120),
      }
    }
    case 'UpdatePath': {
      const blobIndex = state.blobs.findIndex((v) => v.id === action.id)
      if (blobIndex !== -1) {
        const blobs = state.blobs.slice(0)
        blobs.splice(blobIndex, 1, {
          ...blobs[blobIndex],
          path: action.path,
        })
        return {
          ...state,
          blobs,
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
        blobs: adjustHues(
          [...state.blobs, blob].sort((a, b) => a.path.t - b.path.t)
        ),
      }
    }
    case 'RemoveBlob':
      return state
    case 'Save':
      localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}${state.storageKey}`,
        JSON.stringify(state.blobs)
      )
      return state
    case 'Clean':
      return { ...state, hue: state.blobs[0]?.hue || state.hue, blobs: [] }
    case 'DarkToggle':
      return {
        ...state,
        lightness:
          state.lightness !== DARK_MODE_LIGHT ? DARK_MODE_LIGHT : DEFAULT_LIGHT,
      }
    default:
      throw new Error('never')
  }
}

// ██╗   ██╗████████╗██╗██╗     ███████╗
// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
// ██║   ██║   ██║   ██║██║     ███████╗
// ██║   ██║   ██║   ██║██║     ╚════██║
// ╚██████╔╝   ██║   ██║███████╗███████║
//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

const generateBlobs = (
  hue: number,
  height: number,
  width: number,
  spacing: number
) => {
  if (height === 0 || spacing === 0)
    throw new Error('Height and count must be more than 0')

  const count = Math.round(height / spacing) || 1
  const topSpace = Math.round(height / (count + 1))
  const hueSpace = Math.round(360 / (count + 1))
  return [...Array(count)].map((_, i) =>
    newBlob(i * topSpace, (hue + i * hueSpace) % 360)
  )
}

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

// const blankPath = {
//   t: 0,
//   a: 0,
//   z: 0,
//   c1x: 0,
//   c1y: 0,
//   c2x: 0,
//   c2y: 0,
// }

const adjustHues = (blobs: Blob[]): Blob[] => {
  // const height = document.scrollingElement.scrollHeight
  const space = blobs.length > 0 ? Math.round(HUE_RANGE / blobs.length) : 0
  return blobs.map((blob, i) => ({ ...blob, hue: (space * i) % 360 }))
}

const randomId = () => Math.round(Math.random() * 1000000)
// const randomColor = (fromHue?: number, toHue?: number) => {
//   if (fromHue != null && toHue != null) {
//     let toAbs = toHue
//     if (fromHue > toHue) {
//       toAbs = Math.abs(toAbs - 360)
//     }

//     const dx = toAbs - fromHue
//     return (
//       _.random(Math.round(fromHue + dx * 0.2), Math.round(toAbs - dx * 0.2)) %
//       360
//     )
//   } else if (fromHue != null) {
//     return (fromHue + _.random(30, 60)) % 360
//   } else {
//     return _.random(360)
//   }
// }
// const parseColorHue = (s: string): number => {
//   const m = s.match(/^hsl\(([0-9]+)/)
//   return (m && parseInt(m[1])) || 0
// }

// const automaticHue = (blobs: Blob[], top: number): number => {
//   if (blobs.length > 0) {
//     console.log('Blobs > 0')
//     const nextBlobIndex = blobs.findIndex((b) => b.path.t > top)
//     if (nextBlobIndex === -1) {
//       console.log('No next blob')
//       return randomColor(blobs[blobs.length - 1].hue)
//     } else if (nextBlobIndex === 0) {
//       console.log('Next blob is first')
//       return randomColor(blobs[0].hue - 60)
//     } else {
//       console.log('In between blobs')
//       return randomColor(blobs[nextBlobIndex - 1].hue, blobs[nextBlobIndex].hue)
//     }
//   } else {
//     console.log('No blobs')
//     return randomColor()
//   }
// }
