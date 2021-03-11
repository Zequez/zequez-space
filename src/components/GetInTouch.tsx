import React from 'react'
import cx from 'classnames'
import { hsl } from '@/lib/utils'
import IconTelegram from '~icons/brands/telegram.svg'
import IconWhatsapp from '~icons/brands/whatsapp.svg'
import IconEmail from '~icons/solid/envelope.svg'
import { Section, Heading, SubHeading } from '../components/Section'

export const GetInTouch: React.FC = ({ children }) => (
  <Section>
    <Heading>Get in touch</Heading>
    <SubHeading>
      I may not respond right away, but I will respond. You can ask me whatever
      you want, and I'll do my best to help you.
    </SubHeading>
    <div className="px-4 -m-1 mb-4 flex justify-center">
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
              `block rounded-md m-1 p-2 text-center bg-opacity-50 shadow-sm border-white border-2 border-opacity-25`
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
)
