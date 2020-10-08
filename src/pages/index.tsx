import React from 'react'
import { Link, PageProps, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import cx from 'classnames'
import { hsl } from '@/lib/utils'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import IconTelegram from '~icons/brands/telegram.svg'
import IconWhatsapp from '~icons/brands/whatsapp.svg'
import IconEmail from '~icons/solid/envelope.svg'
import IconRight from '~icons/solid/angle-right.svg'

const IndexPage = ({}: PageProps): JSX.Element => {
  const people = useStaticQuery(graphql`
    query {
      allFile(
        filter: { relativeDirectory: { eq: "people" } }
        sort: { fields: base, order: ASC }
      ) {
        nodes {
          base
          relativePath
          childImageSharp {
            fluid(
              maxWidth: 75
              duotone: { highlight: "#ffffff", shadow: "#000000", opacity: 50 }
            ) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  `).allFile.nodes.reduce((all: any, n: any) => {
    all[n.base] = n.childImageSharp.fluid
    return all
  }, {} as Record<string, string>)

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
      <Section>
        <Heading>Hi there</Heading>
        <Pha>My name is Ezequiel Schwartzman, I also go by Zequez.</Pha>
        <Pha>I play many roles and enjoy doing many things.</Pha>
        <Pha>
          Here you may find a little glimpse of myself, on this little space of
          the Internet.
        </Pha>
      </Section>
      <Section>
        <Heading>My work</Heading>
        <SubHeading>I mostly make software; mostly web software</SubHeading>
        <div className="px-4 mt-2 flex flex-col">
          <div className="relative bg-white bg-opacity-25 px-4 py-4 rounded-md mb-2">
            <div
              className="absolute left-0 top-0 px-1 -mt-3 ml-2 rounded-sm
            text-white bg-black bg-opacity-50 uppercase text-xs"
            >
              Current focus
            </div>
            <div className="font-semibold text-lg mb-2">Agora.Mardel</div>
            <div className="flex flex-wrap -m-1 mb-2">
              <div className="bg-black bg-opacity-25 rounded-sm text-xs m-1 px-1">
                TypeScript
              </div>
              <div className="bg-black bg-opacity-25 rounded-sm text-xs m-1 px-1">
                React
              </div>
              <div className="bg-black bg-opacity-25 rounded-sm text-xs m-1 px-1">
                CouchDB (on the work)
              </div>
              <div className="bg-black bg-opacity-25 rounded-sm text-xs m-1 px-1">
                Holochain (wishlist)
              </div>
              <div className="bg-black bg-opacity-25 rounded-sm text-xs m-1 px-1">
                AGPL
              </div>
            </div>
            <p className="mb-1">
              Agora.Mardel is a collaborative app for my hometown to help all
              our local vegan, biodynamic, cooperative and environmental
              organizations, businesses and activists.
            </p>
            <p className="mb-1">
              The strategy is to build it in a way that can be self-managed by
              locals and progressively add in decentralized technology over time
              (I want it to use Holochain and IPFS). I'm going to keep adding
              tools as I find the systems and people that would benefit from
              them.
            </p>
            <p className="mb-1">
              I also want it to serve as a place to redirect people when doing
              activism locally.
            </p>
            <div className="flex -mx-1 pt-2 justify-end">
              <a
                href="https://agora.mardel.org"
                className="bg-black bg-opacity-25 mx-1 px-2 py-1 rounded-sm"
              >
                Visit on agora.mardel.org
              </a>
              <a
                href="https://github.com/zequez/agora-mardel"
                className="bg-black bg-opacity-25 mx-1 px-2 py-1 rounded-sm"
              >
                On Github
              </a>
            </div>
          </div>
          <SimpleLink to="/projects">
            Explore all my work (12 more projects)
          </SimpleLink>
        </div>
      </Section>
      <Section>
        <Heading>Need a hand?</Heading>
        <SubHeading>Let us work together</SubHeading>
        <div className="px-4"></div>
        <div className="px-4 flex flex-col">
          <p className="mb-1">
            I can help you with web/app/mobile development, DevOps, consulting,
            maintenance, task automation, and really anything software or web
            related.
          </p>
          <p className="mb-4">
            I specially love cooperatives work arrangements, if you want partner
            up on an horizontal organization count me in!
          </p>
          <SimpleLink to="/projects">
            Explore my skillset, see if I fit you
          </SimpleLink>
        </div>
      </Section>
      <Section>
        <Heading>Want to give me a hand?</Heading>
        <SubHeading>Patreon my work</SubHeading>
        <div className="px-4">
          <p className="mb-1">
            Let's practice gift economics together! I'm building free and open
            source software for the commons and doing my best as an activist to
            help everyone around me.
          </p>
          <p className="mb-1">
            If you are going through an abundant season and want to patreon me I
            would love to meet you! If I can help you with anything
            software-related or otherwise don't hesitate to drop me a line! I am
            very approachable!
          </p>
          <p className="mb-4">
            I really want to believe that a whole different kind of world is
            possible.
          </p>
          <div className="flex justify-end">
            <a
              href="https://liberapay.com/Zequez/donate"
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://img.shields.io/liberapay/receives/Zequez.svg?logo=liberapay" />
            </a>
          </div>
        </div>
      </Section>
      <Section>
        <Heading>Get in touch</Heading>
        <SubHeading>
          I may not respond right away, but I will respond. You can ask me
          whatever you want, and I'll do my best to help you.
        </SubHeading>
        <div className="px-4 -m-1 flex justify-center">
          {[
            {
              hue: 80,
              Icon: IconWhatsapp,
              name: 'Phone/Whatsapp',
              text: '+5492235235568',
              link: 'https://wa.me/5492235235568',
            },
            {
              hue: 190,
              Icon: IconTelegram,
              name: 'Telegram',
              text: '@Zequez',
              link: 'https://t.me/Zequez',
            },
            {
              hue: 15,
              Icon: IconEmail,
              name: 'Email',
              text: 'zequez@gmail.com',
              link: 'mailto:zequez@gmail.com',
            },
          ].map((v, i) => (
            <div key={i} className="w-1/3">
              <a
                href={v.link}
                className={cx(
                  `block rounded-md m-1 p-2  text-center bg-opacity-50 shadow-sm`
                )}
                target="_blank"
                rel="noreferrer"
                style={{ backgroundColor: hsl(v.hue, 40, 50) }}
              >
                <div>
                  <v.Icon className="h-8 mb-2 inline-block current-color" />
                </div>
                <div className="font-semibold text-sm overflow-hidden ellipsis">
                  {v.name}
                </div>
                <div className="text-xs overflow-hidden ellipsis">{v.text}</div>
              </a>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <Heading>Other facets of me</Heading>
        <SubHeading>
          A programmer when gardening. A vegan while programming. A maker when
          doing activism. One part of me cannot be separated from another.
        </SubHeading>
        <div className="px-4 flex flex-col">
          <SimpleLink to="/writer">📃👨‍🏫 Writing & Blogging</SimpleLink>
          <SimpleLink to="/chef">🌮👨‍🍳 Vegan food alchemy & Recipes</SimpleLink>
          <SimpleLink to="/maker">🔨👨‍🏭 DIY & Making</SimpleLink>
          <SimpleLink to="/gardener">🍅👨‍🌾 Gardening & Growing food</SimpleLink>
        </div>
      </Section>
      <Section>
        <Heading>Causes I resonate with</Heading>
        <SubHeading>
          I believe all these converge into the more beautiful world our hearts
          know it's possible. Working on anything resonating with this, fills me
          with great joy.
        </SubHeading>
        <div className="px-4 flex flex-col">
          <SimpleLink to="/causes/floss">
            🍏💻 Free and open source software movement
          </SimpleLink>
          <SimpleLink to="/causes/veganism">🐮💚 Veganism movement</SimpleLink>
          <SimpleLink to="/causes/buddhism">
            ☸️🧘‍♂️ Engaged buddhism movement
          </SimpleLink>
          <SimpleLink to="/causes/cooperativism">
            🌲🌲 Cooperative movement
          </SimpleLink>
          <SimpleLink to="/causes/biodynamic">
            🌱🌎 Biodynamic agriculture movement
          </SimpleLink>
        </div>
      </Section>
      <Section>
        <Heading>Interbeing</Heading>
        <SubHeading>
          <p className="mb-1">
            I'm but a sum of everyone that left an imprint on me. My parents, my
            family, my teachers, my companions, my town, my experiences. I carry
            them all in my heart.
          </p>
          <p className="mb-1">
            This is my way to commemorate and express my gratitude to the people
            that touched me.
          </p>
        </SubHeading>
        <div className="px-4 -m-2 flex flex-wrap">
          <Monument
            name="Thich Nhat Hanh"
            description="Dharma teacher"
            to="/people/thich"
            photo={people['thich.jpg']}
          />
          <Monument
            name="Charles Eisenstein"
            description="Philosophy teacher"
            to="/people/charles"
            photo={people['charles.jpg']}
          />
          <Monument
            name="Rupert Sheldrake"
            description="Science teacher"
            to="/people/rupert"
            photo={people['rupert.jpg']}
          />
        </div>
      </Section>
      <div className="flex-grow bg-blue-500"></div>
    </Layout>
  )
}

const Monument: React.FC<{
  name: string
  description: string
  to: string
  photo: any
}> = ({ name, description, to, photo }) => (
  <div className="w-1/2 flex">
    <Link
      className="bg-white bg-opacity-25 p-2 flex flex-grow rounded-md m-2 items-center"
      to={to}
    >
      <div className="overflow-hidden rounded-full mr-2 w-12 h-12 flex-shrink-0">
        <Img fluid={photo} />
      </div>
      <div className="">
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs">{description}</div>
      </div>
    </Link>
  </div>
)

// const BgUp: React.FC<{ color: string }> = ({ color }) => (
//   <div className={cx('absolute h-full w-full', color)}></div>
// )

const Section: React.FC<unknown> = ({ children }) => {
  return (
    <div className={cx('relative text-white text-opacity-85 mb-4 z-30')}>
      <div className={cx('')}>
        <div className="container max-w-md mx-auto">{children}</div>
      </div>
    </div>
  )
}

const Heading: React.FC<{ className?: string }> = ({ children, className }) => (
  <h2
    className={cx(
      'px-4 pb-2 font-bold text-3xl tracking-wide text-opacity-100 text-white leading-none mb-2',
      className
    )}
  >
    {children}
  </h2>
)

const SubHeading: React.FC = ({ children }) => (
  <p className="px-4 pb-4 -mt-2 font-light leading-snug">{children}</p>
)

const Pha: React.FC<unknown> = ({ children }) => (
  <p className="px-4 pb-1 font-light leading-snug">{children}</p>
)

const SimpleLink: React.FC<{ to: string }> = ({ children, to }) => (
  <Link
    to={to}
    className="bg-white bg-opacity-25 hover:bg-opacity-50 px-4 py-2 rounded-md mb-2 inline-flex items-center"
  >
    <span className="flex-grow">{children}</span>
    <IconRight className="fill-current h-6" />
  </Link>
)

export default IndexPage
