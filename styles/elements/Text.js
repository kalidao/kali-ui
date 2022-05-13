import { styled } from "../stitches.config";

const Text = styled('div', {
    color: '$foreground',
    
    variants: {
        variant: {
            heading: {
                fontSize: '2.3rem',
                fontFamily: 'Screen',
                color: '$foreground'
            }
        },
        color: {
            background: {
                color: '$background'
            },
            foreground: {
                color: '$foreground'
            },
            highlight: {
                color: '$highlight'
            }
        },
        size: {
            lg: {
                fontSize: '2.5rem'
            }
        }
    }
})

export default Text