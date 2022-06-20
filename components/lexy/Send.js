import React from 'react'
import { styled } from '../../styles/stitches.config'
import { Flex, Text, Button } from '../../styles/elements'
import { Form, Input } from '../../styles/form-elements'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

const Icon = styled(PaperPlaneIcon, {
  transform: 'rotate(330deg)',
})

export default function Send({ loading, submit, question, setQuestion }) {
  return (
    <Form>
      <Input
        type="text"
        name="question"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        css={{
          fontFamily: 'Regular',
          borderRadius: '10px',
        }}
      />
      <Button onClick={submit} variant="cta" disabled={loading}>
        {loading ? (
          'Sending...'
        ) : (
          <Flex
            css={{
              gap: '8px',
            }}
          >
            <Text>Ask</Text>
            <Icon />
          </Flex>
        )}
      </Button>
    </Form>
  )
}
