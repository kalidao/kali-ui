import Layout from '../../layout'
import Sidebar from './sidebar/'
import { Flex } from '../../../styles/elements'
import { useNetwork } from 'wagmi'
import { useRouter } from 'next/router'

export default function DaoLayout({ heading, crowdsale, children, props }) {
  const router = useRouter()
  const { chainId } = router.query // DAO chain ID
  const { chain } = useNetwork() // current wallet chain ID
  console.log(`DAO chain: ${chainId}, user wallet chain: ${chain}`)

  let userOnWrongChain

  if (chain != chainId) {
    // user is not connected to the same chain that the DAO lives on
    // warn them to switch to avoid transacting with the wrong chain
    userOnWrongChain = true
  } else {
    userOnWrongChain = false
  }

  return (
    <Layout heading={heading} {...props}>
      <Flex
        css={{
          position: 'relative',
          top: '5rem',
          left: '0',
          right: '0',
          maxWidth: '100vw',
          justifyContent: 'space-evenly',
        }}
      >
        <Sidebar crowdsale={crowdsale} />
        <Flex
          css={{
            width: '75vw',
            position: 'relative',
            height: '100vh',
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Layout>
  )
}
