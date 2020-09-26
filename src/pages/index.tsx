import React from 'react'
import cx from 'classnames'
import { Link, PageProps } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'

const IndexPage = ({ location }: PageProps): JSX.Element => {
  return (
    <Layout>
      <SEO
        keywords={[
          `zequez`,
          `web development`,
          `personal site`,
          `programming`,
          `blog`,
          `freelancer`,
          `activism`,
          `patreon`,
          `peace`,
          `buddhism`,
          `vegan`,
          `recipes`,
          `help`,
        ]}
        description="My little space of the Internet to spread love and understanding."
        title="Zequez's Space"
      />
    </Layout>
  )
}

export default IndexPage
