import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import blobsStore, { StorageBlobs } from '@/data/blobsStore'
import useLocalStorage from '@/lib/useLocalStorage'
import SvgBlob, { SvgBlobType, SVG_W } from './NewSvgBlob'
import * as p from './Points'

const LOCAL_STORAGE_KEY = '_blobs4_'

const MEDIA_QUERIES = [
  'block sm:hidden',
  'hidden sm:block lg:hidden',
  'hidden lg:block',
]

const COLORS = [
  'text-gray-500',
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
  'text-teal-500',
  'text-blue-500',
  'text-indigo-500',
  'text-purple-500',
  'text-pink-500',
]

const randomId = () => Math.round(Math.random() * 1000000)

const DEFAULT: SvgBlobType = {
  id: randomId(),
  top: 300,
  path: [0, 0, [500, 50], [500, -50]],
  className: '',
  color: 'text-orange-500',
}

const cleanUpBlobs = (blobs: SvgBlobType[]) =>
  blobs.sort((a, b) => a.top - b.top).reverse()

const SvgBlobsList: React.FC<{ blobsKey: string }> = ({ blobsKey }) => {
  const staticBlobs = (blobsStore[blobsKey] || {
    timestamp: 0,
    blobs: [],
  }) as StorageBlobs

  const [dynamicBlobs, setDynamicBlobs] = useLocalStorage<StorageBlobs>(
    LOCAL_STORAGE_KEY + blobsKey,
    { timestamp: 0, blobs: [] }
  )

  const updateDynamicBlobs = (
    newBlobs: SvgBlobType[] | ((v: SvgBlobType[]) => SvgBlobType[])
  ) => {
    if (typeof newBlobs === 'function') {
      setDynamicBlobs((oldBlobs) => ({
        timestamp: +new Date(),
        blobs: cleanUpBlobs(newBlobs(oldBlobs.blobs)),
      }))
    } else {
      setDynamicBlobs({
        timestamp: +new Date(),
        blobs: cleanUpBlobs(newBlobs),
      })
    }
  }

  const blobs = (staticBlobs.timestamp > dynamicBlobs.timestamp
    ? staticBlobs
    : dynamicBlobs
  ).blobs

  if (blobs === staticBlobs.blobs) {
    console.log('Using static blobs')
  } else {
    console.log('Using localstorage blobs')
  }

  if (blobs.length === 0) {
    updateDynamicBlobs(blobs.concat([DEFAULT]))
  }

  function updateBlob(index: number, blob: SvgBlobType) {
    const newBlobs = blobs.concat([])
    newBlobs.splice(index, 1, blob)
    updateDynamicBlobs(newBlobs)
  }

  function addNewBlobOnPoint(ev: MouseEvent) {
    const newBlob: SvgBlobType = {
      ...DEFAULT,
      path: p.clone(DEFAULT.path),
      id: randomId(),
      top: ev.clientY,
      color: _.sample(COLORS) || '',
    }
    console.log('Add new blob on point', newBlob.top, newBlob.color)

    updateDynamicBlobs((oldBlobs) => oldBlobs.concat([newBlob]))
  }

  function removeBlob(index: number) {
    console.log('REMOVE!')
    const newBlobs = blobs.concat([])
    newBlobs.splice(index, 1)
    setDynamicBlobs({ timestamp: +new Date(), blobs: newBlobs })
  }

  useEffect(() => {
    // function checkClick(ev: MouseEvent) {
    //   console.log('dblclick', ev.clientY)
    // }
    window.addEventListener('dblclick', addNewBlobOnPoint)
    return () => {
      window.removeEventListener('dblclick', addNewBlobOnPoint)
    }
  }, [blobs.length])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {blobs.map((blobProps, i) => (
        <SvgBlob
          key={blobProps.id}
          {...blobProps}
          onChange={(p) => updateBlob(i, p)}
        />
      ))}
      {/* <div className="absolute inset-0 z-10" onClick={addNewBlobOnPoint}></div> */}
    </div>
  )
}

export default SvgBlobsList
