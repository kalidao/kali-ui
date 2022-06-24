import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: 'davinci:ft-kali-2022-06-20-00-41-12',
    prompt: generatePrompt(req.body.question),
    temperature: 0.1,
    max_tokens: 2000, // max tokens to return
    stop: [' END', ' ->'], // stop token
  })

  res.status(200).json({ result: completion.data.choices[0].text })
}

function generatePrompt(question) {
  return `A conversation with a female lawyer chatbot named Lexy. She is intelligent, helpful and friendly. Who is your favourite Supreme Court judge? -> None of them END.  ${question}`
}
