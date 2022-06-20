import { Flex } from '../../styles/elements'
import NewDao from './NewDao'
import Log from './Log'

export default function ActivityLog({ allDaos }) {
  return (
    <Flex dir="col">
      <Flex
        as="h2"
        css={{
          fontSize: '36px',
          fontFamily: 'Bold',
          minWidth: '25rem',
          height: 'auto',
          borderBottom: '1px solid $gray6',
          paddingBottom: '0.5rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        🚀 Active DAOs <NewDao />
      </Flex>
      {allDaos && <Log allDaos={allDaos && allDaos} />}
    </Flex>
  )
}
