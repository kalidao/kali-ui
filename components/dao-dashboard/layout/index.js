import Layout from '../../layout'
import Sidebar from './sidebar/'
import { Box } from '../../../styles/elements'

export default function DaoLayout({ heading, children, props }) {
  return (
    <Layout heading={heading} {...props}>
      <Sidebar />
      <Box
        css={{
          position: 'absolute',
          top: '7rem',
          left: '5rem',
        }}
      >
        {children}
      </Box>
    </Layout>
  )
}
