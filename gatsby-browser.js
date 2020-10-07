import './src/css/style.css'
import { StoreProvider } from '@/components/BlobsMaker/store'

const portal = document.createElement('div')
portal.id = 'modal-root'
document.body.appendChild(portal)

export const wrapRootElement = StoreProvider
