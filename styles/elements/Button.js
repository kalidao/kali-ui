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
        },
    },
    defaultVariants: {
        variant: 'primary'
    } 
})

export default Button