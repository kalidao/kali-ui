import { useState } from 'react'
// import { useNetwork } from 'wagmi'
// import { productionChains } from '../../constants/productionChains'
import { Flex, Box } from '../../styles/elements'
import { Select } from '../../styles/form-elements'
import DaoCard from './DaoCard'

// create a new component called Log that fetches the activity log from the provider
export default function Log({ allDaos }) {
  // const { activeChain } = useNetwork()
  // TODO: defaulting to mainnet because error when trying to fetch from goerli
  const [chain, setChain] = useState(1)

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Select
        name="chainId"
        onChange={(e) => setChain(e.target.value)}
        defaultValue={chain}
        css={{
          width: '50%',
        }}
      >
        <Select.Item value={1}>Mainnet</Select.Item>
        <Select.Item value={137}>Polygon</Select.Item>
        <Select.Item value={42161}>Arbitrum</Select.Item>
        <Select.Item value={10}>Optimism</Select.Item>
      </Select>
      <Box
        css={{
          display: 'grid',
          gap: '2rem',
          marginBottom: '5rem',

          '@media (min-width: 630px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'auto',
          },

          '@media (min-width: 940px)': {
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'auto',
          },
        }}
      >
        {allDaos && allDaos[chain].map((dao) => <DaoCard dao={dao} key={dao.id} chain={chain} />)}
      </Box>
    </Flex>
  )
}
