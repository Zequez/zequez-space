import Reactfrom 'react'
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
      <div className="flex items-stretch flex-wrap container mx-auto p-2">
        <Tile icn="bg-green-600" ocn=" w-1/3">
          Programming
        </Tile>
        <Tile icn="bg-green-400" ocn="w-1/3">
          Work
          <br />
          Philosophy
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Life
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Writing
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Visual
          <br />
          Art
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Music
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Cooking
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Reading
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          People
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Links
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Patreonship
        </Tile>
        <Tile icn="bg-orange-600" ocn="w-1/3">
          Photography
        </Tile>
        <Tile icn="bg-blue-600" ocn="w-full">
          Connect with me
        </Tile>
      </div>
    </Layout>
  )
}

const Tile = ({
  ocn,
  icn,
  children,
}: {
  ocn: string
  icn: string
  children: React.ReactNode
}) => (
  <div
    className={cx(
      `relative p-2 h-32 text-xl
       text-white font-bold text-right`,
      ocn
    )}
  >
    <div
      className={cx(
        `absolute inset-0 m-2 px-2 py-2 flex items-end justify-end
      shadow-sm rounded-lg cursor-pointer whitespace-no-wrap overflow-hidden`,
        icn
      )}
    >
      {children}
    </div>
  </div>
)

export default IndexPage
