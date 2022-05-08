import { styled } from "../stitches.config";

const Text = styled('div', {
    color: '$foreground',
    
    variants: {
        type: {
            heading: {
                fontSize: '32px'
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