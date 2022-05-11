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
            white: {
                color: 'white'
            }
        }
    }
})

export default Text