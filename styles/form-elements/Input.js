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
        color: '$gray11',
        backgroundColor: '$gray3',
        border: '1px solid $gray7',

        '&:hover': {
          color: '$gray12',
          backgroundColor: '$gray4',
          border: '1px solid $gray8',
        },

        '&:focus': {
          color: '$gray12',
          backgroundColor: '$gray5',
          border: '1px solid $gray8',
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
        color: '$gray11',
        backgroundColor: '$gray3',
        border: '1px solid $gray7',

        '&:hover': {
          color: '$gray12',
          backgroundColor: '$gray4',
          border: '1px solid $gray8',
        },

        '&:focus': {
          color: '$gray12',
          backgroundColor: '$gray5',
          border: '1px solid $gray8',
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
        color: '$gray11',
        backgroundColor: '$gray3',
        border: '1px solid $gray7',

        '&:hover': {
          color: '$gray12',
          backgroundColor: '$gray4',
          border: '1px solid $gray8',
        },

        '&:focus': {
          color: '$gray12',
          backgroundColor: '$gray5',
          border: '1px solid $gray8',
        },
        '&::-webkit-calendar-picker-indicator': {
          filter: 'invert(100%)',
        },
        '&::-webkit-datetime-edit-fields-wrapper': {
          color: '$foreground',
        },
      },
      textarea: {
        padding: '0.5rem',
        width: '97%',
        minHeight: '10vh',
      },
      checkbox: {
        width: 25,
        height: 'auto',
        color: '$gray3',
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
