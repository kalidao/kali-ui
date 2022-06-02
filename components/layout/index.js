import Header from './Header'
import { Box } from '../../styles/elements'
import globalStyles from '../../styles/globalStyles'

export default function Layout({ heading, children, props }) {
  globalStyles()

  return (
    <Box
      css={{
        fontFamily: 'Display',
      }}
      {...props}
    >
      <Header heading={heading} />
      {children}
    </Box>
  )
}
