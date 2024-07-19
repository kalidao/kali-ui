import ReactMarkdown from 'react-markdown'
import Layout from '../components/layout'
import { privacy } from '../constants/privacy'
import { useTheme } from 'next-themes'

export default function Privacy() {
  const { theme: mode } = useTheme()
  return (
    <Layout heading="KaliCo Privacy Policy" content="The terms contained here define our relationship with each other.">
      <div>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            h2: ({ node, ...props }) => <h2 style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            p: ({ node, ...props }) => <p style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            li: ({ node, ...props }) => <li style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
            em: ({ node, ...props }) => <i style={{ color: mode === 'dark' ? 'white' : 'black' }} {...props} />,
          }}
        >
          {privacy}
        </ReactMarkdown>
      </div>
    </Layout>
  )
}
