type Project = {
  name: string
  circa: string
  slug: string
  tagline: string
  highlight: boolean
  images: string[]
  tags: string[]
  description: string[]
  links: { text: string; href: string }[]
}

export const projects: Project[]
