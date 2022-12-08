import merge from 'lodash.merge'
import { darkTheme, Theme } from '@rainbow-me/rainbowkit'
import { vars } from '@kalidao/reality'

export const getRainbowTheme = (mode: string) => {
  const accentColor = mode === 'dark' ? 'black' : 'white'
  const accentColorForeground = mode === 'dark' ? 'white' : 'black'
  const connectText = mode === 'dark' ? 'white' : 'black'
  const shadowColor = mode === 'dark' ? 'hsl(250, 46.8%, 38.9%)' : 'hsl(250, 74.8%, 38.9%)'

  return merge(darkTheme(), {
    blurs: {
      modalOverlay: 'blur(30px)',
    },
    colors: {
      accentColor: accentColor,
      accentColorForeground: accentColorForeground,
      connectButtonBackground: accentColor,
      connectButtonText: connectText,
      connectButtonInnerBackground: 'none',
      modalBackground: 'none',
      selectedOptionBorder: '1px solid #fff',
    },
    fonts: {
      body: `"InterVar", sans-serif`,
    },
    shadows: {
      connectButton: `1px 1px 8px 1px ${shadowColor}`,
    },
    radii: {
      actionButton: vars.radii['2xLarge'],
      connectButton: vars.radii['2xLarge'],
      menuButton: vars.radii['2xLarge'],
      modal: vars.radii['2xLarge'],
      modalMobile: vars.radii['2xLarge'],
    },
  } as Theme)
}
