import { useState, useEffect, useContext } from 'react'
import { StoreContext } from './store'

export const useStore = () => useContext(StoreContext)
export function useHueAt(ref: { current: Element | null }) {
  const { hue, plainMode, blobs } = useStore()
  const [hueAt, setHueAt] = useState(hue)

  useEffect(() => {
    // console.log(textRef.current, hue)
    if (ref.current) {
      let thisHue = hue
      if (!plainMode) {
        const top = ref.current.getBoundingClientRect().top + window.scrollY
        thisHue = blobs.find((b) => b.path.t > top)?.hue || hue
      }
      setHueAt(thisHue)
    }
  }, [hue])

  return hueAt
}
