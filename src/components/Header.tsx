import React from 'react'
import cx from 'classnames'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const Header: React.FC<HeaderProps> = () => {
  const profile = useStaticQuery(graphql`
    query ProfileImage {
      file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          fixed(width: 160, height: 160) {
            ...GatsbyImageSharpFixed_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <header className={`p-4 pb-8 container mx-auto flex justify-center z-30`}>
      <Link
        to="/"
        className="relative block rounded-full overflow-hidden
        border-8 border-dashed border-white border-opacity-25 z-10"
      >
        <Img
          style={{ display: 'block' }}
          title="I love this picture"
          fixed={profile.file.childImageSharp.fixed}
          imgStyle={{ objectFit: 'cover' }}
        />
      </Link>
    </header>
  )
}

export default Header
