import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { PageProps } from 'gatsby'
import { GetInTouch } from '../components/GetInTouch'
import { Profiles } from '../components/Profiles'

const ContactPage = ({}: PageProps): JSX.Element => {
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
        title="Meet me"
      />
      <GetInTouch />
      <Profiles />
    </Layout>
  )
}

export default ContactPage
