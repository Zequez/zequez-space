import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'
import IconRight from '~icons/solid/angle-right.svg'
import IconExternalLink from '~icons/solid/external-link-alt.svg'

export const Section: React.FC<unknown> = ({ children }) => {
  return (
    <div className={cx('relative text-white text-opacity-85 mb-8 z-30')}>
      <div className={cx('')}>
        <div className="container max-w-screen-md mx-auto">{children}</div>
      </div>
    </div>
  )
}

export const Heading: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <h2
    className={cx(
      'px-4 pb-2 font-thin text-3xl tracking-wider text-opacity-100 text-white leading-none mb-2',
      className
    )}
  >
    <span className="border-b-2 border-white border-opacity-25">
      {children}
    </span>
  </h2>
)

export const SubHeading: React.FC = ({ children }) => (
  <p className="px-4 pb-4 -mt-2 text-white text-opacity-75 font-light leading-snug">
    {children}
  </p>
)

export const Pha: React.FC<unknown> = ({ children }) => (
  <p className="px-4 pb-4 font-light leading-snug">{children}</p>
)

const linkClass =
  'bg-white bg-opacity-25 hover:bg-opacity-50 px-4 py-2 rounded-md mb-2 inline-flex items-center'
export const SimpleLink: React.FC<{ to: string }> = ({ children, to }) =>
  to.startsWith('http') ? (
    <a href={to} className={linkClass} target="_blank" rel="noreferrer">
      <span className="flex-grow">{children}</span>
      <IconExternalLink className="fill-current h-4" />
    </a>
  ) : (
    <Link to={to} className={linkClass}>
      <span className="flex-grow">{children}</span>
      <IconRight className="fill-current h-6" />
    </Link>
  )

export const LinksContainer: React.FC<unknown> = ({ children }) => (
  <div className="px-4 mb-2 flex flex-col">{children}</div>
)

export const IconClass = 'h-4 -mt-1 mr-2 inline-block current-color'
