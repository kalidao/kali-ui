import Flex from './Flex'

import { TiWarning } from 'react-icons/ti'

export default function Warning({ warning }) {
  return (
    <Flex
      css={{
        background: '$black',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.6rem',
        boxShadow: 'rgba(255, 255, 255, 0.06) 0px 2px 4px 0px inset',
        color: '$foreground',
        padding: '10px',
        borderRadius: '20px',
      }}
    >
      <TiWarning color="yellow" />
      {warning}
    </Flex>
  )
}
