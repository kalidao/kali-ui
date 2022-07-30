import Layout from '../../layout'
import Sidebar from './sidebar/'
import { Flex } from '../../../styles/elements'

export default function DaoLayout({ heading, crowdsale, children, props }) {
  return (
    <Layout heading={heading} {...props}>
      <Flex
        css={{
          position: 'absolute',
          top: '5rem',
          left: '0',
          right: '0',
          maxWidth: '100vw',
        }}
      >
        <Sidebar crowdsale={crowdsale} />
        <>{children}</>
      </Flex>
    </Layout>
  )
}
