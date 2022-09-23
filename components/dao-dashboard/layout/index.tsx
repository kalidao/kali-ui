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
        gap="md"
        css={{
          position: 'relative',
          top: '5rem',
          width: '100%',
        }}
      >
        <Sidebar />
        <Flex
          css={{
            width: '100%',

            '@media (max-width: 640px)': {
              width: '100%',
            },
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Layout>
  )
}
