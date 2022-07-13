import Layout from '../../layout'
import Sidebar from './sidebar/'
import { Box } from '../../../styles/elements'

export default function DaoLayout({ heading, crowdsale, children, props }) {
  return (
    <Layout heading={heading} {...props}>
      <Sidebar crowdsale={crowdsale} />
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
