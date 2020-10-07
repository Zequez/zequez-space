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
  } = useContext(StoreContext)

  useEffect(() => {
    window.requestAnimationFrame(() => {
      regenerate()
    })
  }, [])

  return (
    <BlobsMaker
      blobs={blobs}
      saturation={saturation}
      lightness={lightness}
      hue={hue}
      height={height}
      width={width}
    />
  )
})

export default BlobsMakerContainer