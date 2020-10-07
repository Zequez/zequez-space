import React, { useState, useRef, useEffect } from 'react'
import { Link, PageProps, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import cx from 'classnames'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import IconTelegram from '~icons/brands/telegram.svg'
import IconWhatsapp from '~icons/brands/whatsapp.svg'
import IconEmail from '~icons/solid/envelope.svg'
import IconRight from '~icons/solid/angle-right.svg'

const IndexPage = ({ location }: PageProps): JSX.Element => {
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
              maxWidth: 150
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

  // console.log(people)

  return (
    <Layout blobsKey="index">
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
        <Heading>Software Making</Heading>
        <SubHeading>Craftmanship of the digital era</SubHeading>
        <div className="px-4">
          <div className="bg-white bg-opacity-25 px-4 py-2 rounded-md mb-2">
            Currently active projects
          </div>
          <div className="bg-white bg-opacity-25 px-4 py-2 rounded-md mb-2">
            Personal projects over the years
          </div>
          <div className="bg-white bg-opacity-25 px-4 py-2 rounded-md mb-2">
            Contract projects over the years
          </div>
          <div className="bg-white bg-opacity-25 p-4 rounded-md mb-2">
            <div className="mb-4">
              Tech that I find exciting and love playing and learning with
            </div>
            <div className="flex flex-wrap justify-center -ml-1 -mr-1">
              {[
                'The web ecosystem',
                'Holochain',
                'Elm',
                'TypeScript',
                'IPFS',
                '3D Printing',
                'Ionic Framework',
                'React',
                'CouchDB',
              ].map((tech, i) => (
                <div
                  key={i}
                  className="px-2 py-1 m-1 flex-grow text-center bg-teal-500 rounded-md"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <Heading>Help me help</Heading>
        <SubHeading>We all desire meaningful work</SubHeading>
        <div className="px-4">
          <div className="bg-white bg-opacity-25 px-4 py-2 rounded-md mb-2">
            Help me help each other. <br />
            Let's work together!
          </div>
          <div
            className=" bg-white bg-opacity-25
            rounded-md mb-2"
          >
            <div className="px-4 py-2 border-b border-white border-opacity-25">
              Help me help others. <br />
              Patreon my work.
            </div>
            <div className="px-4 py-1 text-sm">Current Patreons</div>
            {[{ name: 'My ever dwilding savings', amount: 'USD 200' }].map(
              ({ name, amount }) => (
                <div
                  key={name}
                  className="flex px-4 py-1 border-t border-white border-opacity-25 text-sm"
                >
                  <div className="flex-grow">{name}</div> <div>{amount}</div>
                </div>
              )
            )}
          </div>
          <div className="bg-white bg-opacity-25 px-4 py-2 rounded-md mb-2">
            What I use money for? 🔥
            <br />
            <div className="text-xs">(Hint: It's mostly rent and food)</div>
          </div>
        </div>
      </Section>
      <Section>
        <Heading>Channels of connection</Heading>
        <SubHeading>
          I will not respond right away, but I will respond. You can ask me
          whatever you want.
        </SubHeading>
        <div className="px-4 -m-1 flex flex-wrap justify-center">
          {[
            {
              color: 'bg-green-700',
              Icon: IconWhatsapp,
              text: '+5492235235568',
              link: 'https://arsars',
            },
            {
              color: 'bg-blue-500',
              Icon: IconTelegram,
              text: '@Zequez',
              link: 'https://asnaeirosar',
            },
            {
              color: 'bg-red-500',
              Icon: IconEmail,
              text: 'zequez@gmail.com',
              link: 'https://asnaeirosar',
            },
          ].map((v, i) => (
            <a
              key={i}
              href={v.link}
              className={cx(
                `rounded-md inline-flex items-center m-1 p-2 text-sm`,
                v.color
              )}
            >
              <v.Icon className="h-4 mr-2 current-color" /> {v.text}
            </a>
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
          <SimpleLink to="/writer">Writing & Blogging</SimpleLink>
          <SimpleLink to="/chef">Vegan food alchemy & Recipes</SimpleLink>
          <SimpleLink to="/maker">DIY & Making</SimpleLink>
          <SimpleLink to="/gardener">Gardening & Growing food</SimpleLink>
          <SimpleLink to="/form">
            Each year of my life in a picture and a sentence
          </SimpleLink>
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
            Free and open source software movement
          </SimpleLink>
          <SimpleLink to="/causes/veganism">Veganism movement</SimpleLink>
          <SimpleLink to="/causes/buddhism">
            Engaged buddhism movement
          </SimpleLink>
          <SimpleLink to="/causes/cooperativism">
            Cooperative movement
          </SimpleLink>
          <SimpleLink to="/causes/biodynamic">
            Biodynamic agriculture movement
          </SimpleLink>
        </div>
      </Section>
      <Section>
        <Heading>People I follow that inspire me deeply</Heading>
        <SubHeading>
          Imagine this as a digital monument to them. Although they may not know
          it, their work has deeply influenced my standing on life. They have my
          attention and my gratitude.
        </SubHeading>
        <div className="px-4 -mx-1 flex">
          <Monument
            name="Thich Nhat Hanh"
            description="Dharma teacher and gardener"
            to="/people/thich"
            photo={people['thich.jpg']}
          />
          <Monument
            name="Charles Eisenstein"
            description="Author and philosopher"
            to="/people/charles"
            photo={people['charles.jpg']}
          />
          <Monument
            name="Rupert Sheldrake"
            description="Biologist and new-science advocate"
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
  <Link
    className="bg-white bg-opacity-25 p-4 flex flex-col rounded-md mx-1 w-1/3 text-center"
    to={to}
  >
    <div className="overflow-hidden rounded-full mb-2">
      <Img fluid={photo} className="text-sm" />
    </div>
    <div className="text-sm font-semibold">{name}</div>
    <div className="text-xs">{description}</div>
  </Link>
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
      'px-4 pb-2 font-bold text-3xl tracking-wide leading-none mb-2',
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
