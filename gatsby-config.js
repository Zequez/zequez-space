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
    // {
    //   resolve: 'gatsby-plugin-graphql-codegen',
    //   options: {
    //     fileName: 'types/graphql.d.ts',
    //   },
    // },
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
    //   resolve: 'gatsby-plugin-tslint',
    //   options: {
    //     test: /\.ts$|\.tsx$/,
    //     exclude: /(node_modules|cache|public)/,
    //   },
    // },
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
        icon: `src/images/icon.svg`,
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
    // {
    //   resolve: 'gatsby-plugin-firebase',
    //   options: {
    //     credentials: {
    //       apiKey: 'AIzaSyACBgRN3a7wNKFYj7tT5zcoJJyxnaRyb8c',
    //       authDomain: 'mardelorg.firebaseapp.com',
    //       databaseURL: 'https://mardelorg.firebaseio.com',
    //       projectId: 'mardelorg',
    //       storageBucket: 'mardelorg.appspot.com',
    //       messagingSenderId: '223051608916',
    //       appId: '1:223051608916:web:97fd1ceae63975d12e4ec1',
    //       measurementId: 'G-VNG95B11PZ',
    //     },
    //   },
    // },
    {
      resolve: 'gatsby-plugin-emoji-favicon',
      options: {
        emoji: '🌳',
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
    // `gatsby-plugin-offline`,
  ],
}
