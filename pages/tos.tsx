import ReactMarkdown from 'react-markdown'
import Layout from '../components/layout'
import { Box } from '@kalidao/reality'
import { tos } from '../constants/tos'
import { useThemeStore } from '@components/hooks/useThemeStore'

export default function ToS() {
  const mode = useThemeStore((state) => state.mode)
  return (
    <Layout
      heading="KaliCo Terms of Service"
      content="The terms contained here define our relationship with each other."
    >
      <Box padding="6" backgroundColor="backgroundSecondary">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            h2: ({ node, ...props }) => <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            p: ({ node, ...props }) => <p style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            li: ({ node, ...props }) => <li style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            em: ({ node, ...props }) => <i style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
          }}
        >
          {tos}
        </ReactMarkdown>
      </Box>
    </Layout>
  )
}
