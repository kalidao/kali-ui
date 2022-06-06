import { styled } from '../stitches.config'
import { bounce } from '../animation'
import { m } from 'framer-motion'

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

        background: '$green600',
        color: '$black',
        width: '4rem',
        height: '4rem',
        fontWeight: '200',
        fontSize: '69px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',

        '&:hover': {
          animation: `${bounce} 0.3s linear 0ms infinite alternate`,
          background: '$green500',
        },
        '&:active': {
          background: '$green500',
        },
      },
      card: {
        background: '$background',
        color: '$foreground',
        width: '180px',
        height: '180px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        gap: '1rem',
        border: '1px solid $gray800',
        borderRadius: '15%',
        boxShadow:
          'rgba(242, 154, 13, 0.4) 5px 5px, rgba(242, 154, 13, 0.3) 10px 10px, rgba(242, 154, 13, 0.2)15px 15px, rgba(242, 154, 13, 0.1) 20px 20px, rgba(242, 154, 13, 0.05) 25px 25px',
        transition: 'linear 0.4s',
        lineHeight: '100%',
        textDecoration: 'none',
        overflow: 'hidden',

        '&:hover': {
          background: '$background',
          color: '$foreground',
          border: '1px solid $gray800',
          boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        },
      },
    },
  },
})

export default Box
