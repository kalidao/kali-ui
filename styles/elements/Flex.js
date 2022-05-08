import { styled } from "../stitches.config";

const Flex = styled('div', {
    display: 'flex',
    
    variants: {
        dir: {
            col: {
               flexDirection: 'column' 
            },
            row: {
                flexDirection: 'row'
            }
        }
    }
})

export default Flex