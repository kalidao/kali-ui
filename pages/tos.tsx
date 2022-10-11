import ReactMarkdown from 'react-markdown'
import Layout from '../components/layout'
import { Box } from '@kalidao/reality'
import { tos } from '../constants/tos'

export default function ToS() {
  return (
    <Layout
      heading="KaliCo Terms of Service"
      content="The terms contained here define our relationship with each other."
    >
      <Box paddingX={'10'} paddingY="2">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => <h2 style={{ color: 'white' }} {...props} />,
            p: ({ node, ...props }) => <p style={{ color: '#F9F6EE' }} {...props} />,
            li: ({ node, ...props }) => <li style={{ color: '#F9F6EE ' }} {...props} />,
            // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
            em: ({ node, ...props }) => <i style={{ color: 'blue' }} {...props} />,
          }}
        >
          {tos}
        </ReactMarkdown>
      </Box>
    </Layout>
  )
}
