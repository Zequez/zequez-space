import React, { useEffect } from 'react'
import { useReducer } from './store'
import BlobsMaker from './BlobsMaker'

const BlobsMakerContainer: React.FC<unknown> = () => {
  const [
    { blobs, saturation, lightness, hue, height, width },
    run,
  ] = useReducer()

  useEffect(() => {
    window.requestAnimationFrame(() => {
      run({ type: 'Regenerate' })
    })
  }, [])

  return (
    <>
      <BlobsMaker
        regenerate={() => run({ type: 'Regenerate' })}
        blobs={blobs}
        saturation={saturation}
        lightness={lightness}
        hue={hue}
        height={height}
        width={width}
      />
      <Controls
        onClean={() => run({ type: 'Clean' })}
        onRegenerate={() => run({ type: 'Regenerate' })}
        onToggleDark={() => run({ type: 'DarkToggle' })}
      />
    </>
  )
}

const Controls: React.FC<{
  onClean: () => void
  onRegenerate: () => void
  onToggleDark: () => void
}> = ({ onClean, onRegenerate, onToggleDark }) => (
  <div
    className="fixed bottom-0 inset-x-0 bg-black bg-opacity-25 z-50
        flex items-center justify-center text-white text-xs"
  >
    <Button onClick={onClean}>Clear</Button>
    <Button onClick={onRegenerate}>Regenerate</Button>
    <Button onClick={onToggleDark}>Toggle Dark</Button>
  </div>
)

const Button: React.FC<{ onClick: () => void }> = ({ onClick, children }) => (
  <button
    className="bg-black bg-opacity-50 hover:bg-opacity-75 py-1 px-2 mx-1 my-2 rounded-md
    text-white uppercase font-semibold"
    onClick={onClick}
  >
    {children}
  </button>
)

export default BlobsMakerContainer
