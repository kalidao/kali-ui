import { styled } from "../stitches.config";

const Button = styled('button', {
    border: 'none',

    variants: {
        variant: {
            icon: {
                background: 'none',
                color: '$highlight',
                borderRadius: '200px 200px 200px 200px'
            },
            accent: {
                background: 'white',
                color: 'black',
                padding: '0.3rem 0.8rem',
                borderRadius: '22.81px',
            },
            transparent: {
                background: 'none',
                color: '$foreground',
                padding: '0.3rem 0.8rem',
                borderRadius: '22.81px',
            },
            hover: {
                display: 'none',
                background: '$highlight',

                '&:hover': {
                    display: 'inline-block'
                }
            }
        },
    }
})

export default Button