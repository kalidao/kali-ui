import { globalCss } from '@stitches/react'

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Regular',
      src: 'url("./fonts/Px-Grotesk-Regular.woff2") format("woff2")',
    },
    {
      fontFamily: 'Light',
      src: 'url("./fonts/Px-Grotesk-Light.woff2") format("woff2")',
      fontStyle: 'light',
    },
    {
      fontFamily: 'Bold',
      src: 'url("./fonts/Px-Grotesk-Bold.woff2") format("woff2")',
      fontStyle: 'bold',
    },
    {
      fontFamily: 'Italic',
      src: 'url("./fonts/Px-Grotesk-Italic.woff2") format("woff2")',
      fontStyle: 'italic',
    },
    {
      fontFamily: 'Screen',
      src: 'url("./fonts/Px-Grotesk-Screen.woff2") format("woff2")',
    },
  ],
  body: {
    margin: 0,
    padding: 0,
    color: '$foreground',
    background: '$background',
    fontFamily: 'Regular',
  },

  a: {
    textDecoration: 'none',
  },
})

export default globalStyles
