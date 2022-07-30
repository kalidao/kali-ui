import Layout from '../../layout'
import { Flex } from '../../../styles/elements'
import Sidebar from './Sidebar'

export default function DaoLayout({ heading, crowdsale, children, props }) {
  return (
    <Layout heading={heading} {...props}>
      <Flex
        css={{
          position: 'relative',
          top: '5rem',
          left: '0',
          right: '0',
          maxWidth: '100vw',
          justifyContent: 'space-evenly'
        }}
      >
        <Sidebar />
        <Flex css={{
          width: '75vw',
          position: 'relative',
          height: '100vh'
        }}>{children}</Flex>
      </Flex>
    </Layout>
  )
}
