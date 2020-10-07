import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import RainbowProfileContainer from './Spectrum/RainbowProfileContainer'
import Controls from './Spectrum/Controls'

const Header: React.FC<unknown> = () => {
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
    <header
      className={`p-4 pb-8 container mx-auto max-w-md
      flex justify-center z-30 relative`}
    >
      <RainbowProfileContainer
        image={profile.file.childImageSharp.fixed}
        to="/"
      />
      <Controls />
    </header>
  )
}

export default Header
