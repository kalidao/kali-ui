import { globalStyle, globalFontFace } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  background: vars.colors.background,
  fontFamily: vars.fonts.sans,
})

globalStyle('a', {
  color: vars.colors.accent,
  fontFamily: vars.fonts.sans,
  textDecoration: 'none',
})

export const pxGroteskScreen = 'Px Grotesk Screen'

globalFontFace(pxGroteskScreen, {
  src: 'local("Px Grotesk Screen"), url("/fonts/Px-Grotesk-Screen.woff2") format("woff2")',
})
