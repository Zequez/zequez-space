import React from 'react'
import cx from 'classnames'
import Header from './Header'
import BlobsMaker from '@/components/BlobsMaker/BlobsMaker'

const devMode = process.env.NODE_ENV === 'development'

type LayoutProps = {
  children: JSX.Element[]
  blobsKey: string
}

const Layout: React.FC<LayoutProps> = ({ children, blobsKey }) => (
  <div
    className={cx(
      'flex flex-col min-h-full font-sans text-gray-900 bg-green-500 relative',
      {
        'debug-screens': devMode,
      }
    )}
  >
    <Header />
    <main className="flex-1 w-full flex flex-col">{children}</main>
    <BlobsMaker blobsKey={blobsKey} />
  </div>
)

export default Layout
