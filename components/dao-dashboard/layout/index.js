import Layout from '../../layout'
import Sidebar from './sidebar/'
import { Flex } from '../../../styles/elements'

export default function DaoLayout({ heading, children, props }) {
  return (
    <Layout heading={heading} {...props}>
      <Flex
        // gap="lg"
        css={{
          width: '100%',
          marginTop: '5rem',
          // background: 'Red',
        }}
      >
        <Flex
          css={
            {
              // width: '15%',
              // background: 'Blue',
            }
          }
        >
          <Sidebar />
        </Flex>
        <Flex
          css={{
            width: '100%',
            // height: '100vh',
            // background: 'Green',
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Layout>
  )
}
