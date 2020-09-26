import React from 'react'
import cx from 'classnames'
import Header from './Header'

const devMode = process.env.NODE_ENV === 'development'

type LayoutProps = {
  children: JSX.Element[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div
    className={cx(
      'flex flex-col min-h-screen font-sans text-gray-900 bg-gray-200',
      {
        'debug-screens': devMode,
      }
    )}
  >
    <Header />
    <main className="flex-1 w-full mx-auto">{children}</main>
  </div>
)

export default Layout
