import { Box, Flex } from '../../styles/elements'
import DaoCard from './DaoCard'

export default function Display({ daos }) {
  return (
    <Flex
      dir="col"
      gap="sm"
      css={{
        marginTop: '1rem',
        alignItems: 'center',
        width: '100%',
        // overflow: 'scroll',
      }}
    >
      {daos.map((dao) => (
        <DaoCard key={dao['id']} dao={dao} chain={dao['chainId']} />
      ))}
    </Flex>
  )
}
