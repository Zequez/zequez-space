import React from 'react'
import cx from 'classnames'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const Header: React.FC<HeaderProps> = () => {
  const profile = useStaticQuery(graphql`
    query ProfileImage {
      file(relativePath: { eq: "profile.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 200, maxHeight: 200) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <header className={`p-4 pb-8 container mx-auto flex justify-center`}>
      <Link
        to="/"
        className="block h-40 w-40 rounded-full overflow-hidden border-8 border-gray-300"
      >
        <Img
          fluid={profile.file.childImageSharp.fluid}
          imgStyle={{ objectFit: 'cover', objectPosition: '75% 75%' }}
        />
      </Link>
    </header>
  )
}

export default Header
