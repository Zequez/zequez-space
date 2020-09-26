import { GatsbyNode } from 'gatsby'

// import fs from 'fs'
// import yaml from 'js-yaml'
import path from 'path'

// const { entities }: { entities: Entity[] } = yaml.safeLoad(
//   fs.readFileSync('./src/data/data.yml', 'utf-8')
// ) as { entities: Entity[] }

// import * as tm from './src/lib/TagsMap'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '~icons': path.resolve(
          __dirname,
          'node_modules/@fortawesome/fontawesome-free/svgs'
        ),
        '@': path.resolve('.', 'src'),
        '@@': path.resolve('.'),
        types: path.resolve('.', 'types'),
      },
    },
  })
}

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
  const { createPage } = actions

  // entities.forEach((entity) => {
  //   createPage({
  //     path: `/${entity.slug}`,
  //     component: require.resolve('./src/pages/_entity.tsx'),
  //     context: { slug: entity.slug },
  //   })

  //   createPage({
  //     path: `/${entity.slug}/editor`,
  //     component: require.resolve('./src/pages/_entity_edit.tsx'),
  //     context: { slug: entity.slug },
  //   })
  // })

  // tm.flatten(tm.fromEntities(entities)).forEach((tagsMap) =>
  //   createPage({
  //     path: tagsMap.path,
  //     component: require.resolve('./src/pages/index.tsx'),
  //     context: { tagsMap: tagsMap },
  //   })
  // )
}
