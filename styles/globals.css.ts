import { globalFontFace, globalStyle } from '@vanilla-extract/css'

import { vars } from '@kalidao/reality'

globalFontFace('Px Grotesk', {
  fontDisplay: 'optional',
  fontStyle: 'normal',
  fontWeight: '400',
  src: "url('/fonts/Px-Grotesk-Regular.woff2') format('woff2')",
})

globalFontFace('Px Grotesk', {
  fontDisplay: 'optional',
  fontStyle: 'italic',
  fontWeight: '400',
  src: "url('/fonts/Px-Grotesk-Italic.woff2') format('woff2')",
})

globalFontFace('Px Grotesk', {
  fontDisplay: 'optional',
  fontStyle: 'screen',
  fontWeight: '400',
  src: "url('/fonts/Px-Grotesk-Screen.woff2') format('woff2')",
})

globalFontFace('Px Grotesk', {
  fontDisplay: 'optional',
  fontStyle: 'light',
  fontWeight: '400',
  src: "url('/fonts/Px-Grotesk-Light.woff2') format('woff2')",
})

globalFontFace('Px Grotesk', {
  fontDisplay: 'optional',
  fontStyle: 'bold',
  fontWeight: '600',
  src: "url('/fonts/Px-Grotesk-Bold.woff2') format('woff2')",
})

globalStyle('*, ::before, ::after', {
  boxSizing: 'border-box',
})


globalStyle('a', {
  textDecoration: 'none',
})
