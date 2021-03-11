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
      className={`p-4 pb-8 container mx-auto max-w-lg
      flex justify-center z-30 relative`}
    >
      <div className="text-white absolute top-0 left-0 mt-4 ml-4 text-xs">
        Ezequiel Schwartzman
        <div className="text-white text-opacity-75">Wizard apprentice</div>
      </div>
      <RainbowProfileContainer
        image={profile.file.childImageSharp.fixed}
        to="/"
      />
      <Controls />
    </header>
  )
}

export default Header
