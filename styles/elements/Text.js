import { styled } from "../stitches.config";

const Text = styled('div', {
    color: '$foreground',
    
    variants: {
        variant: {
            heading: {
                fontSize: '2.3rem',
                fontFamily: 'Screen',
                color: '$foreground'
            },
            link: {
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: '$purple300',
                fontFamily: 'Italic'
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
            },
            accent: {
                color: '$accent'
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