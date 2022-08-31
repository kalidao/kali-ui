import { styled } from '../stitches.config'

const Text = styled('div', {
  color: '$foreground',

  variants: {
    variant: {
      heading: {
        fontSize: '32px',
        fontFamily: 'Bold',
        color: '$gray12',
      },
      link: {
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: '$purple300',
        fontFamily: 'Italic',
      },
      instruction: {
        fontSize: '1rem',
        color: '$gray11',
      },
    },
    color: {
      background: {
        color: '$background',
      },
      foreground: {
        color: '$foreground',
      },
      highlight: {
        color: '$highlight',
      },
      accent: {
        color: '$accent',
      },
    },
    size: {
      lg: {
        fontSize: '2.5rem',
      },
    },
  },
})

export default Text
