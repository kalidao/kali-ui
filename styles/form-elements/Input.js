import { styled } from '../stitches.config'

const Input = styled('input', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  height: 32,
  fontSize: 12,
  lineHeight: 1,
  color: '$foreground',
  backgroundColor: '$background',
  border: '1px solid $foreground',
  boxShadow: `4px 6px 10px -7px $highlight2`,

  '&:hover': {
    boxShadow: 'hsla(37, 100%, 50%, 0.6) 0px 2px 2px, hsla(37, 100%, 50%, 0.6) 0px 2px 2px',
  },

  '&:focus': {
    boxShadow: 'hsla(37, 100%, 50%, 0.6) 0px 2px 2px, hsla(37, 100%, 50%, 0.6) 0px 2px 2px',
  },

  variants: {
    variant: {
      voting: {
        width: '3rem',
        border: 'none',
      },
      calendar: {
        '&::-webkit-calendar-picker-indicator': {
          filter: 'invert(100%)',
        },
        '&::-webkit-datetime-edit-fields-wrapper': {
          color: '$foreground',
        },
      },
      address: {
        width: '16.5rem'
      },
      textarea: {
        padding: '0.5rem', 
        width: '97%', 
        minHeight: '10vh'
      }
    },
    size: {
      sm: {
        width: '2.9rem'
      }
    }
  },
})

export default Input
