import Layout from '../../layout'
import Sidebar from './sidebar'
import { Flex } from '../../../styles/elements'

type DaoLayoutProps = {
  heading: string,
  content: Boolean,
  children: React.ReactNode
}

export default function DaoLayout({ heading, content, children }: DaoLayoutProps) {
  return (
    <Layout heading={heading} content={content}>
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
        <Sidebar />
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
