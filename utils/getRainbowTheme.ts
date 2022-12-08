import merge from 'lodash.merge'
import { darkTheme, Theme } from '@rainbow-me/rainbowkit'

export const getRainbowTheme = (mode: string) => {
  const accentColor = mode === 'dark' ? 'white' : 'black'
  const accentColorForeground = mode === 'dark' ? 'black' : 'white'
  const connectText = mode === 'dark' ? 'white' : 'black'

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
      selectedOptionBorder: '',
    },
    fonts: {
      body: `"InterVar", sans-serif`,
    },
    shadows: {
      connectButton: '1px 2px 6px rgba(1,50,50, 0.2)',
    },
  } as Theme)
}
