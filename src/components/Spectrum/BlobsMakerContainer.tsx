import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { StoreContext } from './store'
import BlobsMaker from './BlobsMaker'

const BlobsMakerContainer: React.FC<unknown> = observer(() => {
  const {
    blobs,
    saturation,
    lightness,
    hue,
    height,
    width,
    regenerate,
    plainMode,
  } = useContext(StoreContext)

  useEffect(() => {
    if (document.readyState === 'complete') {
      window.requestAnimationFrame(() => {
        regenerate()
      })
    } else {
      window.addEventListener('load', () => {
        window.alert('Loaded!')
        window.requestAnimationFrame(() => {
          regenerate()
        })
      })
    }
  }, [])

  return (
    <BlobsMaker
      blobs={plainMode ? [] : blobs}
      saturation={saturation}
      lightness={lightness}
      hue={hue}
      height={height}
      width={width}
    />
  )
})

export default BlobsMakerContainer
