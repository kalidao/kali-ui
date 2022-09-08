import Layout from '../../layout'
import Sidebar from './sidebar/'
import { Flex } from '../../../styles/elements'

export default function DaoLayout({ heading, crowdsale, children, props }) {
  return (
    <Layout heading={heading} {...props}>
      <Flex
        gap="lg"
        css={{
          width: '100%',
          marginTop: '5rem',
          left: '0',
          right: '0',
        }}
      >
        <Flex
          css={{
            width: '12%',
          }}
        >
          <Sidebar crowdsale={crowdsale} />
        </Flex>
        <Flex
          css={{
            width: '100%',
            height: '100vh',
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Layout>
  )
}
