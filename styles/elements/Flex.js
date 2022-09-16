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
        gap: '0.5rem',
      },
      md: {
        gap: '1rem',
      },
      lg: {
        gap: '1.5rem',
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
