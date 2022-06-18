import React, { useState } from 'react'
import Layout from '../components/layout'
import { Flex, Box, Button } from '../styles/elements'
import { Form, Input } from '../styles/form-elements'
export default function lexy() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState()
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/lexy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    })
    const data = await response.json()
    setAnswer(data.result)
    // setQuestion('')
    setLoading(false)
  }

  return (
    <Layout heading="Lexy">
      <Flex
        css={{
          gap: '1rem',
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '6rem',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          css={{
            font: 'Regular',
            lineHeight: 1,
            color: '$gray12',
          }}
        >
          {answer}
        </Box>
        <Form>
          <Input
            type="text"
            name="question"
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button onClick={submit} variant="cta" disabled={loading}>
            Submit
          </Button>
        </Form>
      </Flex>
    </Layout>
  )
}
