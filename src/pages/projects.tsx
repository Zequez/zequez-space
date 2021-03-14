import React from 'react'
import Img from 'gatsby-image'
import { Link, PageProps, useStaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import {
  Heading,
  IconClass,
  LinksContainer,
  Pha,
  Section,
  SimpleLink,
  SubHeading,
} from '../components/Section'
import { projects } from '../data/projects.yml'

interface ProjectsPageProps {}

const ProjectsPage: React.FC<ProjectsPageProps> = () => {
  const images = useStaticQuery(graphql`
    query {
      allFile(
        filter: { relativeDirectory: { eq: "projects" } }
        sort: { fields: base, order: ASC }
      ) {
        nodes {
          base
          relativePath
          childImageSharp {
            fluid(maxWidth: 800) {
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
        keywords={[`projects`, `programming`, `archive`, `web`, `apps`]}
        description="Archive of all projects, new and old"
        title="Projects archive"
      />
      <Section>
        <Heading>Projects archive</Heading>
        {projects.map((project, i) => (
          <div
            key={i}
            className="relative bg-white bg-opacity-25 px-4 py-4 mx-4 mt-4 rounded-md mb-8"
          >
            {project.tagline ? (
              <div
                className="absolute left-0 top-0 px-1 -mt-2 ml-2 rounded-sm
  text-white bg-black bg-opacity-50 uppercase text-xxs"
              >
                {project.tagline}
              </div>
            ) : null}
            <div className="font-semibold text-lg mb-2">
              {project.name}
              <span className="text-white text-opacity-50 font-thin">
                &nbsp;(Circa ~{project.circa})
              </span>
            </div>
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
            <div className="-mx-4 mb-4">
              {project.images.map((src) => (
                <Img fluid={images[src]} key={src} />
              ))}
            </div>
            {project.description &&
              project.description.map((pharagraph, i) => (
                <p className="mb-4" key={i}>
                  {pharagraph}
                </p>
              ))}
            <div className="flex -mx-1 pt-2 justify-end">
              {project.links &&
                project.links.map(({ text, href }, i) => (
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
      </Section>
      <Section>
        <Heading>Older stuff</Heading>
        <Pha>
          There was a website at zequez.com which I don't really care about
          right now. And on that website there was detailed information about
          past projects that I couldn't care less about. In the spirit of not
          caring about it, instead of porting all that data and updating my
          description of the projects and yadda yadda, I'll just link you to
          that website at oldsite.zequez.space and call it a day.
        </Pha>
        <LinksContainer>
          <SimpleLink to="https://oldsite.zequez.space">
            Visit the predecesor of my personal website
          </SimpleLink>
        </LinksContainer>
      </Section>
    </Layout>
  )
}

export default ProjectsPage
