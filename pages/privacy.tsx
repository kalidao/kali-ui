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
            h1: ({ node, ...props }) => (
              <h2
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className={`leading-7 [&:not(:first-child)]:mt-6 text-foreground`} {...props} />
            ),
            ul: ({ node, ...props }) => <ul className={`my-6 ml-6 list-disc [&>li]:mt-2`} {...props} />,
            li: ({ node, ...props }) => <li className="text-foreground" {...props} />,
            em: ({ node, ...props }) => <i className="text-foreground" {...props} />,
          }}
        >
          {privacy}
        </ReactMarkdown>
      </div>
    </Layout>
  )
}
