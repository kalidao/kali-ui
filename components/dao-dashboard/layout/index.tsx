import Layout from '@components/layout'
import Sidebar from './sidebar'
import { Flex } from '@design/elements'

type DaoLayoutProps = {
  heading: string
  content: string
  children: React.ReactNode
}

export default function DaoLayout({ heading, content, children }: DaoLayoutProps) {
  return (
    <Layout heading={heading} content={content}>
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
