import { globalCss } from '@stitches/react'

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Regular',
      src: 'url("./fonts/Px-Grotesk-Regular.woff2")',
    },
    {
      fontFamily: 'Light',
      src: 'url("./fonts/Px-Grotesk-Light.woff2")',
    },
    {
      fontFamily: 'Bold',
      src: 'url("./fonts/Px-Grotesk-Bold.woff2")',
    },
    {
      fontFamily: 'Italic',
      src: 'url("./fonts/Px-Grotesk-Italic.woff2")',
    },
    {
      fontFamily: 'Screen',
      src: 'url("./fonts/Px-Grotesk-Screen.woff2")',
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
