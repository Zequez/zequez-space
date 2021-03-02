type Project = {
  name: string
  tagline: string
  highlight: boolean
  tags: string[]
  description: string[]
  links: { text: string; href: string }[]
}

export const projects: Project[]
