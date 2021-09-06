import React from 'react'

import IconGithub from '~icons/brands/github.svg'
import IconReddit from '~icons/brands/reddit.svg'

import IconLinkedIn from '~icons/brands/linkedin.svg'
import IconInstagram from '~icons/brands/instagram.svg'
import IconTwitter from '~icons/brands/twitter.svg'
import IconFacebook from '~icons/brands/facebook.svg'
import IconDiscourse from '~icons/brands/discourse.svg'
import {
  Section,
  Heading,
  SubHeading,
  SimpleLink,
  LinksContainer,
  IconClass,
} from '../components/Section'

export const Profiles: React.FC = ({ children }) => (
  <Section>
    <Heading>Internet profiles</Heading>
    <SubHeading>Any activity here I'll probably read it eventually.</SubHeading>
    <LinksContainer>
      <SimpleLink to="https://github.com/zequez">
        <IconGithub className={IconClass} /> Github
      </SimpleLink>
      <SimpleLink to="https://www.reddit.com/user/zequez">
        <IconReddit className={IconClass} /> Reddit
      </SimpleLink>
      <SimpleLink to="https://twitter.com/zequez">
        <IconTwitter className={IconClass} /> Twitter
      </SimpleLink>
      <SimpleLink to="https://www.instagram.com/zequez.space/">
        <IconInstagram className={IconClass} /> Instagram
      </SimpleLink>
      <SimpleLink to="https://www.facebook.com/Zequez/">
        <IconFacebook className={IconClass} /> Facebook
      </SimpleLink>
      <SimpleLink to="https://www.linkedin.com/in/zequez">
        <IconLinkedIn className={IconClass} />
        LinkedIn
      </SimpleLink>
      <SimpleLink to="https://forum.holochain.org/u/zequez">
        <IconDiscourse className={IconClass} />
        Holochain forum (you gotta be logged in)
      </SimpleLink>
    </LinksContainer>
  </Section>
)
