const path = require('path')

module.exports.onCreateWebpackConfig = ({ actions }) => {
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

module.exports.createPages = async ({ actions }) => {
  const { createPage } = actions
}
