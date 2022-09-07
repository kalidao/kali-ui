import Layout from '../../layout'
import Sidebar from './sidebar/'
import { Flex } from '../../../styles/elements'

export default function DaoLayout({ heading, crowdsale, children, props }) {
  console.log(heading)
  return (
    <Layout heading={heading} {...props}>
      <Flex
        gap="lg"
        css={{
          // background: 'Yellow',
          width: '100%',
          // position: 'relative',
          marginTop: '5rem',
          left: '0',
          right: '0',
          // maxWidth: '100vw',
          // justifyContent: 'space-evenly',
        }}
      >
        <Flex
          css={{
            // background: 'Yellow',
            width: '12%',
            // position: 'relative',
            // marginTop: '5rem',
            // left: '0',
            // right: '0',
            // maxWidth: '100vw',
            // justifyContent: 'space-evenly',
          }}
        >
          <Sidebar crowdsale={crowdsale} />
        </Flex>
        <Flex
          css={{
            width: '100%',
            // width: '100%',
            // alignItems: 'center',
            // position: 'relative',
            height: '100vh',
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Layout>
  )
}
