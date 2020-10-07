import React, { createContext } from 'react'
import { makeAutoObservable } from 'mobx'
import _ from 'lodash'

export const SVG_W = 500
const DEFAULT_LIGHT = 45
const DARK_MODE_LIGHT = 15

export class Store {
  blobs: Blob[] = []
  height = 2000
  width = 1000
  hue = _.random(360)
  saturation = 50
  lightness = DEFAULT_LIGHT

  constructor() {
    makeAutoObservable(this)
  }

  regenerate = () => {
    this.hue = (this.hue + _.random(30)) % 360
    this.height = document.body.scrollHeight
    this.width = document.body.scrollWidth
    this.blobs = generateBlobs(this.hue, this.height, this.width, 120)
  }

  toggleDark = () => {
    this.lightness =
      this.lightness !== DARK_MODE_LIGHT ? DARK_MODE_LIGHT : DEFAULT_LIGHT
  }

  clean = () => {
    this.hue = this.blobs[0]?.hue || this.hue
    this.blobs = []
  }
}

export const StoreContext = createContext<Store>({} as Store)
export const StoreProvider = ({ element }: { element: JSX.Element }) => {
  return (
    <StoreContext.Provider value={new Store()}>{element}</StoreContext.Provider>
  )
}

export type Blob = {
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

// const adjustHues = (blobs: Blob[]): Blob[] => {
//   const space = blobs.length > 0 ? Math.round(HUE_RANGE / blobs.length) : 0
//   return blobs.map((blob, i) => ({ ...blob, hue: (space * i) % 360 }))
// }

// const randomId = () => Math.round(Math.random() * 1000000)
