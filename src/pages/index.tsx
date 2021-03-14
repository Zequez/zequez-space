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
          <SimpleLink to="https://www.notion.so/Mission-Misi-n-b1a05b1d61cd4dfc87d91258f70be767">
            ❤ Personal mission statement
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
            <IconGithub className={IconClass} />
            See my Github activity
          </SimpleLink>
          <SimpleLink to="/projects">🗄 Projects archive</SimpleLink>
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
          <SimpleLink to="https://www.notion.so/Material-desires-Deseos-materiales-f3da9213b8224697ba02befc8fea0108">
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
