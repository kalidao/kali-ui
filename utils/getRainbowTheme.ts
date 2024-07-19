import merge from 'lodash.merge'
import { darkTheme, lightTheme, Theme } from '@rainbow-me/rainbowkit'

export const getRainbowTheme = (mode: string) => {
  const accentColor = mode === 'dark' ? '#000000' : '#FFFFFF'
  const accentColorForeground = mode === 'dark' ? '#FFFFFF' : '#000000'
  const connectText = mode === 'dark' ? '#FFFFFF' : '#000000'
  const shadowColor = mode === 'dark' ? 'hsl(250, 46.8%, 38.9%)' : 'hsl(250, 74.8%, 38.9%)'

  return merge(mode === 'light' ? lightTheme() : darkTheme(), {
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
      actionButton: '12px',
      connectButton: '12px',
      menuButton: '12px',
      modal: '12px',
      modalMobile: '12px',
    },
  } as Theme)
}
