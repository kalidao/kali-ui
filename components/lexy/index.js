import { useState } from 'react'
import Send from './Send'
import Texts from './Texts'
import Counter from './Counter'
import { Flex } from '../../styles/elements'

export default function Lexy() {
  const [texts, setTexts] = useState([
    {
      name: 'Lexy',
      text: 'Hey! I am Lexy. I am a legal consulting chatbot. How can I help you?',
    },
  ])
  const [question, setQuestion] = useState()
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    let textsArray = texts
    let questionObj = {}
    questionObj['name'] = 'Human'
    questionObj['text'] = question
    texts.push(questionObj)

    const response = await fetch('/api/lexy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: `${question} ->` }),
    })
    const data = await response.json()

    console.log('data', data?.result)
    let answerObj = {}
    answerObj['name'] = 'Lexy'
    answerObj['text'] = data.result

    textsArray.push(answerObj)

    setTexts(textsArray)
    setQuestion('')
    setCount(count++)
    setLoading(false)
  }

  return (
    <Flex
      css={{
        gap: '1rem',
        position: 'absolute',
        left: '10%',
        right: '10%',
        top: '6rem',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        background: '$gray2',
        padding: '1rem',
        border: '1px solid $gray6',
        borderRadius: '20px',
      }}
    >
      <Flex
        dir="col"
        gap="md"
        css={{
          width: '75%',
        }}
      >
        <Texts texts={texts} />
        <Send submit={submit} question={question} setQuestion={setQuestion} loading={loading} />
      </Flex>
      <Counter count={count} />
    </Flex>
  )
}
