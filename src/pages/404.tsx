import React from 'react'
import { PageProps } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'

const NotFoundPage = ({}: PageProps): JSX.Element => {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div>
        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
          Parece que esta página no existe en esta dimensión
        </h2>
      </div>
    </Layout>
  )
}

export default NotFoundPage
