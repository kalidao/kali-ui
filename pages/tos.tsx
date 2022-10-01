import ReactMarkdown from 'react-markdown'
import Layout from '../components/layout'
import { Box } from '../styles/elements'
import { tos } from '../constants/tos'

export default function ToS() {
  return (
    <Layout
      heading="KaliCo Terms of Service"
      content="The terms contained here define our relationship with each other."
    >
      <Box
        css={{
          position: 'absolute',
          top: '5rem',
          padding: '0.5rem 1.5rem',
        }}
      >
        <ReactMarkdown>{tos}</ReactMarkdown>
      </Box>
    </Layout>
  )
}
