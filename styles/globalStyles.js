import { globalCss } from '@stitches/react'

const globalStyles = globalCss({
  body: {
    margin: 0,
    padding: 0,
    color: '$gray11',
    background: #36393f,
    fontFamily: 'Regular',
  },

  a: {
    textDecoration: 'none',
  },
})

export default globalStyles
