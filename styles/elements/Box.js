import { styled } from '../stitches.config'
import { bounce } from '../animation'

const Box = styled('div', {
  variants: {
    animation: {
      bounce: {
        animation: `${bounce} 0.3s linear 0ms infinite alternate`,
      },
    },
    variant: {
      create: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        margin: '0.5rem',

        background: '$violet4',
        color: '$gray12',
        width: '4rem',
        height: '4rem',
        fontWeight: '500',
        fontSize: '69px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',

        '&:hover': {
          animation: `${bounce} 0.3s linear 0ms infinite alternate`,
          background: '$violet5',
        },
        '&:active': {
          background: '$violet6',
        },
      },
      card: {
        background: '$gray2',
        color: '$gray11',
        width: '12rem',
        height: '100%',
        padding: '0.5rem',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        gap: '1rem',
        border: '1px solid $mauve10',
        borderRadius: '20px',
        lineHeight: '100%',
        textDecoration: 'none',
        overflow: 'hidden',

        '&:hover': {
          background: '$gray3',
          color: '$gray12',
          border: '1px solid $mauve11',
        },
        '&:active': {
          background: '$gray4',
          color: '$gray12',
          border: '1px solid $mauve12',
        },
      },
    },
  },
})

export default Box
