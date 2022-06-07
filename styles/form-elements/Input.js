import { styled } from '../stitches.config'

const Input = styled('input', {
  variants: {
    variant: {
      primary: {
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
      },
      voting: {
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
        width: '3rem',
        border: 'none',
        boxShadow: `4px 6px 10px -7px $highlight2`,

        '&:hover': {
          boxShadow: 'hsla(37, 100%, 50%, 0.6) 0px 2px 2px, hsla(37, 100%, 50%, 0.6) 0px 2px 2px',
        },

        '&:focus': {
          boxShadow: 'hsla(37, 100%, 50%, 0.6) 0px 2px 2px, hsla(37, 100%, 50%, 0.6) 0px 2px 2px',
        },
      },
      calendar: {
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
        '&::-webkit-calendar-picker-indicator': {
          filter: 'invert(100%)',
        },
        '&::-webkit-datetime-edit-fields-wrapper': {
          color: '$foreground',
        },
      },
      address: {
        all: 'unset',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: '0 10px',
        height: 32,
        width: '16.5rem',
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
      },
      textarea: {
        padding: '0.5rem',
        width: '97%',
        minHeight: '10vh',
      },
      checkbox: {
        width: 25,
        height: 25,
        color: '$foreground',
      },
    },
    size: {
      sm: {
        width: '2.9rem',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export default Input
