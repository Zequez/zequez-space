import React from 'react'
import cx from 'classnames'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = ({}) => {
  const profile = useStaticQuery(graphql`
    {
      profile: file(relativePath: { eq: "profile.jpg" }) {
        base
        relativePath
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  console.log(profile)

  return <header className={cx(`p-2 text-3xl text-white`)}></header>
}

export default Header
