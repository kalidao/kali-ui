import Header from './Header'
import { Box } from '../../styles/elements'

export default function Layout({ heading, children, props }) {
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
