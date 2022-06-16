import Flex from './Flex'
import { TiWarning } from 'react-icons/ti'
import { styled } from '../stitches.config'

const StyledWarning = styled(TiWarning, {
  color: '$yellow9',

  '&:hover': {
    color: '$yellow10',
  },
})
export default function Warning({ warning }) {
  return (
    <Flex
      css={{
        background: '$gray2',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
        border: '1px solid $gray6',
        color: '$gray11',
        padding: '10px',
        borderRadius: '20px',
      }}
    >
      <StyledWarning />
      {warning}
    </Flex>
  )
}
