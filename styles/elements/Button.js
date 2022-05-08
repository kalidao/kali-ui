import { styled } from "../stitches.config";

const Button = styled('button', {
    border: 'none',

    variants: {
        type: {
            icon: {
                background: 'none',
                color: 'highlight'
            }
        },
        color: {

        },
    }
})

export default Button