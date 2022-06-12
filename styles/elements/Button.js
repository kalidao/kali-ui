import { styled } from '../stitches.config'

const Button = styled('button', {
  border: 'none',

  variants: {
    effect: {
      film: {
        '&:hover': {
          background: 'hsl(0, 0%, 70%, 0.5)',
          color: '$gray100',
        },
      },
    },
    variant: {
      brutal: {
        backgroundColor: '$violet4',
        border: '2px solid $violet6',
        borderRadius: '30px',
        boxShadow: `$violet6 4px 4px 0 0`,
        color: '$mauve11',
        cursor: 'pointer',
        display: 'inline-block',
        fontWeight: '600',
        fontSize: '18px',
        padding: '0px 8px',
        fontFamily: 'Screen',
        lineHeight: '35px',
        textAlign: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        '-webkit-user-select': 'none',
        touchAction: 'manipulation',

        '&:hover': {
          color: '$mauve12',
          background: '$violet5',
          border: '2px solid $violet7',
        },
        '&:active': {
          color: '$mauve12',
          background: '$violet6',
          boxShadow: '$violet8 2px 2px 0 0',
          transform: 'translate(2px, 2px)',
        },
        '@media (min-width: 768px)': {
          minWidth: '120px',
          padding: '0 25px',
        },
      },
      icon: {
        background: 'none',
        color: '$highlight',
        borderRadius: '200px 200px 200px 200px',
      },
      primary: {
        background: 'white',
        color: 'black',
        padding: '0.3rem 0.8rem',
        borderRadius: '22.81px',

        '&:disabled': {
          background: '$gray200',
          color: '$gray100',
        },
      },
      transparent: {
        background: 'none',
        color: '$foreground',
        padding: '0.3rem 0.8rem',
        borderRadius: '22.81px',
      },
      info: {
        all: 'unset',
        fontFamily: 'inherit',
        borderRadius: '100%',
        height: 20,
        width: 20,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '$background',
        backgroundColor: 'none',
        boxShadow: `0 2px 10px black`,
        '&:hover': { boxShadow: `0 2px 10px white` },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      back: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.1em',
        maxWidth: '5em',
        background: 'none',
        color: '$foreground',
        '&:hover': {
          background: 'hsl(0, 0%, 70%, 0.5)',
          color: '$gray100',
        },
      },
      cta: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3.5px 10px',
        borderRadius: '20px',

        backgroundColor: '$violet10',
        border: '1px solid $violet9',
        color: '$mauve12',
        fontFamily: 'Bold',
        fontSize: '14px',

        '&:hover': {
          backgroundColor: '$violet9',
        },
        '&:active': {
          backgroundColor: '$violet10',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export default Button
