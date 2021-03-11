import React from 'react'
import { Link, PageProps, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/Seo'

import IconGithub from '~icons/brands/github.svg'

import IconLinkedIn from '~icons/brands/linkedin.svg'
import { projects } from '../data/projects.yml'

import {
  Section,
  Heading,
  SubHeading,
  Pha,
  SimpleLink,
  LinksContainer,
  IconClass,
} from '../components/Section'
import { GetInTouch } from '../components/GetInTouch'
import { Profiles } from '../components/Profiles'

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
        title="Meet me"
      />
      <Section>
        <Heading>Hi there</Heading>
        <SubHeading>
          I enjoy doing many things. Here you may find out about such things.
        </SubHeading>
      </Section>
      <Section>
        <Heading>Open source work</Heading>
        <SubHeading>
          I enjoy creating tools that enhance life. I work in service of life. I
          love life.
        </SubHeading>
        <Pha>
          Imagine if you could create a fantastic technological device that
          helped beings around the world. Now imagine this device, once
          designed, could be magically reproduced over and over without any
          cost! That's how software works, it's an infinite gift that keeps on
          giving! I don't see any reason to create artificial scarcity of
          anything I create, everything I do is a gift I can give to everyone.
        </Pha>
        <Pha>Latest projects</Pha>
        <LinksContainer>
          <SimpleLink to="https://github.com/Zequez/santuario">
            🐮 Santuario (experimental tools for communities)
          </SimpleLink>
          <SimpleLink to="https://github.com/Zequez/mandelbrot-sandbox">
            🌿 Mandelbrot Sandbox
          </SimpleLink>
          <SimpleLink to="https://github.com/Zequez/zequez-space">
            🚀 Zequez.Space (this site)
          </SimpleLink>
          <SimpleLink to="https://github.com/Zequez/the-hero-journey">
            🐎 The Hero Journey (life tracking app)
          </SimpleLink>
        </LinksContainer>
        <Pha>All stuff</Pha>
        <LinksContainer>
          <SimpleLink to="https://github.com/zequez">
            <IconGithub className="h-6 -mt-1 mr-2 inline-block current-color" />
            See my Github activity
          </SimpleLink>
          {projects
            .filter((p) => p.highlight)
            .map((project, i) => (
              <div
                key={i}
                className="relative bg-white bg-opacity-25 px-4 py-4 rounded-md mb-2"
              >
                <div
                  className="absolute left-0 top-0 px-1 -mt-3 ml-2 rounded-sm
            text-white bg-black bg-opacity-50 uppercase text-xs"
                >
                  Current focus
                </div>
                <div className="font-semibold text-lg mb-2">{project.name}</div>
                <div className="flex flex-wrap -m-1 mb-2">
                  {project.tags.map((tagName) => (
                    <div
                      key={tagName}
                      className="bg-black bg-opacity-25 rounded-sm text-xs m-1 px-1"
                    >
                      {tagName}
                    </div>
                  ))}
                </div>
                {project.description.map((pharagraph, i) => (
                  <p className="mb-1" key={i}>
                    {pharagraph}
                  </p>
                ))}
                <div className="flex -mx-1 pt-2 justify-end">
                  {project.links.map(({ text, href }, i) => (
                    <a
                      href={href}
                      key={i}
                      className="bg-black bg-opacity-25 mx-1 px-2 py-1 rounded-sm"
                    >
                      {text}
                    </a>
                  ))}
                </div>
              </div>
            ))}
        </LinksContainer>
      </Section>
      <Section>
        <Heading>Work in organizations</Heading>
        <SubHeading>
          I've worked on some places with some people; nothing too impressive.
        </SubHeading>
        <LinksContainer>
          <SimpleLink to="https://www.linkedin.com/in/zequez">
            <IconLinkedIn className={IconClass} />
            Visit LinkedIn profile
          </SimpleLink>
        </LinksContainer>
      </Section>
      <Section>
        <Heading>Life timeline</Heading>
        <SubHeading>Significant life events, work and projects.</SubHeading>
        <LinksContainer>
          <SimpleLink to="/timeline">🌌 Visit the timeline</SimpleLink>
        </LinksContainer>
      </Section>
      <Section>
        <Heading>Need a hand?</Heading>
        <SubHeading>Let me help you with that</SubHeading>
        <Pha>
          Aside from the open source work I do, I can also help you specifically
          for something in particular, which I would love to do. I can help you
          with web/app/mobile development, DevOps, consulting, maintenance, task
          automation, and really anything software or web related.
        </Pha>
        <LinksContainer>
          <SimpleLink to="/contact">💬 Get in touch</SimpleLink>
        </LinksContainer>
      </Section>
      <Section>
        <Heading>Want to give me a hand?</Heading>
        <SubHeading>Support my gifts</SubHeading>
        <Pha>
          There is a whole spectrum of material wealth that I can use to support
          my life and my loved ones in wholesome ways. It's not about surviving,
          it's about thriving, it's about having access to the things that
          support me in expressing my highest version of myself and my mission
          in life. I want to create a more beautiful world for me and everyone
          around me.
        </Pha>
        <Pha>
          Whatever form of kindness you want to manifest, just get in touch with
          me so we can explore it together!
        </Pha>
        <LinksContainer>
          <SimpleLink to="/desired-material-wealth">
            🥭 Desired material wealth page
          </SimpleLink>
        </LinksContainer>
        {/*
          <div className="flex justify-end">
            <a
              href="https://liberapay.com/Zequez/donate"
              target="_blank"
              rel="noreferrer"
            >
              <img src="https://img.shields.io/liberapay/receives/Zequez.svg?logo=liberapay" />
            </a>
          </div> */}
      </Section>
      <GetInTouch />
      <Profiles />
      <div className="flex-grow bg-blue-500"></div>
    </Layout>
  )
}

export default IndexPage
