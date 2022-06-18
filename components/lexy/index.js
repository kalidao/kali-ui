import { useState } from 'react'
import Send from './Send'
import Texts from './Texts'
import { Flex } from '../../styles/elements'

export default function Lexy() {
  const [texts, setTexts] = useState([
    {
      name: 'Lexy',
      text: 'Hi! I am Lexy. Ask me questions :)',
    },
  ])
  const [question, setQuestion] = useState()
  const [answer, setAnswer] = useState()
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    let textsArray = texts
    let questionObj = {}
    questionObj['name'] = 'Human'
    questionObj['text'] = question
    texts.push(questionObj)

    setLoading(true)
    console.log('question', question)
    const response = await fetch('/api/lexy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: question }),
    })
    const data = await response.json()
    console.log('data', data.result)
    setAnswer(data.result)
    let answerObj = {}
    answerObj['name'] = 'Lexy'
    answerObj['text'] = data.result
    textsArray.push(answerObj)
    setTexts(textsArray)
    setQuestion('')
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
        justifyContent: 'center',
        flexDirection: 'column',
        background: '$gray2',
        padding: '1rem',
        border: '1px solid $gray6',
        borderRadius: '20px',
      }}
    >
      <Texts texts={texts} />
      <Send submit={submit} question={question} setQuestion={setQuestion} loading={loading} />
    </Flex>
  )
}
