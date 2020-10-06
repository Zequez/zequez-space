import React, { useEffect } from 'react'
import _ from 'lodash'
import { reverseMap } from '@/lib/utils'
import { useReducer } from './store'
import Blob from './Blob'

const BlobsMaker: React.FC<{ blobsKey: string }> = ({ blobsKey }) => {
  const [{ blobs, saturation, lightness }, run] = useReducer(blobsKey)

  function addNewBlobOnPoint(ev: MouseEvent) {
    run({
      type: 'AddNewBlob',
      top: ev.pageY,
    })
  }

  useEffect(() => {
    window.addEventListener('dblclick', addNewBlobOnPoint)
    return () => {
      window.removeEventListener('dblclick', addNewBlobOnPoint)
    }
  }, [blobs.length])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {reverseMap(blobs, (blob, i) => (
        <Blob
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

export default BlobsMaker

// ██╗   ██╗████████╗██╗██╗     ███████╗
// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
// ██║   ██║   ██║   ██║██║     ███████╗
// ██║   ██║   ██║   ██║██║     ╚════██║
// ╚██████╔╝   ██║   ██║███████╗███████║
//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

const genColor = (hue: number, saturation: number, lightness: number): string =>
  `hsl(${hue}, ${saturation}%, ${lightness}%)`
