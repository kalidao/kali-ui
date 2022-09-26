import Layout from '@components/layout'
import Menu from './Menu'
import { Box } from '@kalidao/reality'
import { layout } from './layout.css'

type DaoLayoutProps = {
  heading: string
  content: string
  children: React.ReactNode
}

export default function DaoLayout({ heading, content, children }: DaoLayoutProps) {
  return (
    <Layout heading={heading} content={content}>
      <Box className={layout}>
        <Box>{children}</Box>
        <Menu />
      </Box>
    </Layout>
  )
}
