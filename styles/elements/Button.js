import { styled } from "../stitches.config";

const Button = styled('button', {
    border: 'none',

    variants: {
        effect: {
            film: {
                '&:hover': {
                    background: 'hsl(0, 0%, 70%, 0.5)',
                    color: '$background'
                }
            }
        },
        variant: {
            icon: {
                background: 'none',
                color: '$highlight',
                borderRadius: '200px 200px 200px 200px'
            },
            primary: {
                background: 'white',
                color: 'black',
                padding: '0.3rem 0.8rem',
                borderRadius: '22.81px',

                '&:disabled': {
                    background: '$gray200',
                    color: '$gray100',
                }
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
                '&:hover': {  boxShadow: `0 2px 10px white` },
                '&:focus': { boxShadow: `0 0 0 2px black` },
            }
        },
    },
    defaultVariants: {
        variant: 'primary'
    } 
})

export default Button