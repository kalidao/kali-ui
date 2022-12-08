import ReactMarkdown from 'react-markdown'
import Layout from '../components/layout'
import { Box } from '@kalidao/reality'
import { privacy } from '../constants/privacy'

export default function Privacy() {
  return (
    <Layout
      heading="KaliCo Privacy Policy"
      content="The terms contained here define our relationship with each other."
    >
      <Box paddingX={'10'} paddingY="2">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h2 style={{ color: 'white' }} {...props} />,
            h2: ({ node, ...props }) => <h2 style={{ color: 'white' }} {...props} />,
            p: ({ node, ...props }) => <p style={{ color: '#F9F6EE' }} {...props} />,
            li: ({ node, ...props }) => <li style={{ color: '#F9F6EE ' }} {...props} />,
            // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
            em: ({ node, ...props }) => <i style={{ color: 'blue' }} {...props} />,
          }}
        >
          {privacy}
        </ReactMarkdown>
      </Box>
    </Layout>
  )
}
