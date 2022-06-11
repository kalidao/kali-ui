import { globalCss } from '@stitches/react'

const globalStyles = globalCss({
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
