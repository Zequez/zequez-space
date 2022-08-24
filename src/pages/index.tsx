import { PageProps } from 'gatsby'
import React from 'react'
import IconGithub from '~icons/brands/github.svg'
import IconLinkedIn from '~icons/brands/linkedin.svg'
import { GetInTouch } from '../components/GetInTouch'
import Layout from '../components/Layout'
import { Profiles } from '../components/Profiles'
import {
  Heading,
  IconClass,
  LinksContainer,
  Pha,
  Section,
  SimpleLink,
  SubHeading,
} from '../components/Section'
import SEO from '../components/Seo'

const IndexPage = ({}: PageProps): JSX.Element => {
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
        <LinksContainer>
          <SimpleLink to="https://www.notion.so/zequez/Free-Web-Developer-5c5aa4ad9fbb4546b2c85e1c539a95d8">
            🌈 Personal work intention
          </SimpleLink>
        </LinksContainer>
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
          <SimpleLink to="https://github.com/Zequez/tzolkin-me">
            🌈 13:20 Law of Time experimental tools
          </SimpleLink>
          <SimpleLink to="https://github.com/Zequez/gameworld-browser">
            🌎 Gameworld Browser: An experimental way to use the web inspired by
            Startover.xyz
          </SimpleLink>
          <SimpleLink to="https://github.com/Zequez/the-offering-game">
            🍇 The Offering Game (experimental marketplace)
          </SimpleLink>
          <SimpleLink to="https://github.com/Zequez/agent-centric-prototyping-service">
            🛸 Agent Centric Prototyping Service
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
          <SimpleLink to="https://github.com/Zequez/santuario">
            🐮 Santuario (experimental tools for communities)
          </SimpleLink>
          <SimpleLink to="https://github.com/zequez">
            <IconGithub className={IconClass} />
            All Github activity
          </SimpleLink>
        </LinksContainer>
      </Section>
      {/* <Section>
        <Heading>Life timeline</Heading>
        <SubHeading>Significant life events, work and projects.</SubHeading>
        <LinksContainer>
          <SimpleLink to="/timeline">🌌 Visit the timeline</SimpleLink>
        </LinksContainer>
      </Section> */}
      <Section>
        <Heading>Need a hand?</Heading>
        <SubHeading>Let me help you with that</SubHeading>
        <Pha>
          Aside from the open source work I do, I can also help you directly
          with anything. Maybe some web/app, consulting, maintenance, or maybe
          just an idea you would like to explore and think I could be of help.
          I'll be happy to work together with you! Just ask!
        </Pha>
        <LinksContainer>
          <SimpleLink to="https://cv.zequez.space">
            👨‍💻 Technical Curriculum Vitae
          </SimpleLink>
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
