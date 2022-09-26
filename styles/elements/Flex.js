import { styled } from '../stitches.config'

const Flex = styled('div', {
  display: 'flex',

  variants: {
    dir: {
      col: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
    },
    align: {
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      separate: {
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      end: {
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    },
    gap: {
      sm: {
        gap: '0.2rem',
      },
      md: {
        gap: '1.2em',
      },
      lg: {
        gap: '2.2em',
      },
    },
    effect: {
      glow: {
        '&:hover': {
          color: '$accent',
        },
      },
    },
  },
})

export default Flex
