import React, { createContext, useContext, useState } from 'react'
import { makeAutoObservable } from 'mobx'
import _ from 'lodash'

const DEFAULT_LIGHT = 45
const DARK_MODE_LIGHT = 15
const PROFILE_SLICES = 16

// Animation
const ROTATION_SECONDS = 10
const HUE_ROT_SECONDS = 3
const UP_DOWN_SECONDS = 2

export class Store {
  blobs: Blob[] = []
  height = 2000
  width = 1000
  hue = _.random(360)
  saturation = 50
  lightness = DEFAULT_LIGHT
  darkMode = false
  plainMode = false

  get isDarkMode() {
    return this.lightness === DARK_MODE_LIGHT
  }

  setPlainMode = (mode: boolean) => {
    this.plainMode = mode
  }

  profile = generateProfile()

  performAnimation = (dt: number) => {
    const { profile: p } = this

    if (p.animating) {
      const radFract = dt / (ROTATION_SECONDS * 1000)
      const radAdd = Math.PI * 2 * radFract
      const hueFract = dt / (HUE_ROT_SECONDS * 1000)
      const hueAdd = -(360 * hueFract)
      const sliceAdd = dt / (UP_DOWN_SECONDS * 1000)

      p.rotation += radAdd
      p.hue = (p.hue + hueAdd) % 360
      p.slices = p.slices.map((size, i) => {
        let newSize = size + (p.directions[i] ? sliceAdd : -sliceAdd)
        if (newSize > 1) {
          newSize = 1 - newSize + 1
          p.directions[i] = !p.directions[i]
        } else if (newSize < 0) {
          newSize = -newSize
          p.directions[i] = !p.directions[i]
        }
        return newSize
      })

      return true
    } else {
      return false
    }
  }

  setProfileAnimation = (animate: boolean) => {
    if (animate) {
      this.profile.animating = true
      const { performAnimation } = this

      let requestTime = +new Date()
      window.requestAnimationFrame(function animation() {
        const currentTime = +new Date()
        const dt = currentTime - requestTime
        if (performAnimation(dt)) {
          requestTime = currentTime
          window.requestAnimationFrame(animation)
        }
      })
    } else {
      this.profile.animating = false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }

  regenerate = () => {
    this.hue = (this.hue + _.random(30)) % 360
    this.height = document.body.scrollHeight
    this.width = document.body.scrollWidth
    this.blobs = generateBlobs(this.hue, this.height, this.width, 120)
    this.profile = generateProfile()
  }

  toggleDark = () => {
    this.lightness =
      this.lightness !== DARK_MODE_LIGHT ? DARK_MODE_LIGHT : DEFAULT_LIGHT
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

const generateProfile = () => ({
  rotation: _.random(Math.PI * 2),
  hue: _.random(360),
  slices: [...Array(PROFILE_SLICES)].map(() => Math.random()),
  directions: [...Array(PROFILE_SLICES)].map(() => Math.random() > 0.5),
  animating: false,
})

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
