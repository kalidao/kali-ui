import { Box } from '../../styles/elements'
import Image from 'next/image'

export default function Spinner({ ...props }) {
  return (
    <Box {...props}>
      <Image src={'/img/spinner.svg'} height="100%" width="100%" alt="Loading..." />
    </Box>
  )
}
