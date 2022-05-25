import { Box } from "../../styles/elements"

const SpinnerIcon = () => <svg className="spinner" viewBox="0 0 50 50">
<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
</svg>

export default function Spinner() {
    return <Box css={{
        animation: 'rotate 2s linear infinite',
        zIndex: '2',
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-25px 0 0 -25px',
        width: '50px',
        height: '50px'
    }}>
        <SpinnerIcon />
    </Box>
}