import { SvgBlobType } from '@/components/NewSvgBlob'

export type StorageBlobs = {
  timestamp: number
  blobs: SvgBlobType[]
}

const BLOBS: Record<string, StorageBlobs> = {
  index: {
    timestamp: 9999,
    blobs: [],
  },
}

export default BLOBS
