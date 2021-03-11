const resolveConfig = require('tailwindcss/resolveConfig')
const tailwindConfig = require('./tailwind.config.js')

const fullConfig = resolveConfig(tailwindConfig)

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  siteMetadata: {
    title: `Zequez's Space`,
    description: ``,
    author: 'Ezequiel Schwartzman',
  },
  plugins: [
    `gatsby-plugin-preval`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,
          options: {
            props: {
              className: 'h-full current-color',
              xmlns: 'http://www.w3.org/2000/svg',
            },
          },
        },
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.jsx?$|\.tsx?$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Lato`,
    //         variants: [`300`, `400`, `700`, `900`], // light normal bold black
    //       },
    //       {
    //         family: `Montserrat`,
    //         variants: [`400`, `700`, `900`],
    //       },
    //     ],
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `zequez-space`,
        short_name: `Zequez's Space`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.primary,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/icon.svg`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-yaml-full',
      options: {
        path: './src/data/',
        plugins: [
          {
            resolve: 'gatsby-yaml-full-markdown',
            options: {
              unwrapSingleLine: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data`,
        name: 'data',
      },
    },
    // {
    //   resolve: `gatsby-source-notion-database`,
    //   options: {
    //     sourceConfig: [
    //       {
    //         name: 'posts',
    //         table:
    //           'https://www.notion.so/46d2fb4fce914dd088603ff7ab0d8c22?v=7d6ab8f9357a41a29b74920489a9abeb',
    //         cacheType: 'html',
    //       },
    //     ],
    //   },
    // },
    // `gatsby-plugin-offline`,
  ],
}
