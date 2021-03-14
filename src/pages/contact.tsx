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
          `wizard`,
          `web development`,
          `personal site`,
          `contact page`,
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
