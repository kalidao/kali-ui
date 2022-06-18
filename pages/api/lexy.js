import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(req.body.question),
    temperature: 1,
    max_tokens: 2000,
    stop: [' Human:', ' Lexy:'],
  })
  console.log(completion.data.choices[0].text)
  res.status(200).json({ result: completion.data.choices[0].text })
}

function generatePrompt(question) {
  return `The following is a conversation with a female lawyer based in New York who specializes in crypto law. Her name is named Lexy. She has deep legal and technical knowledge. She is helpful, creative, intelligent, and very friendly. \n\nHuman: Hello, who are you?\nLexy: I am a bot created by KALI using OpenAI. How can I help you today?\nHuman: What is a UNA?\nLexy: A UNA is an "Unincorporated Non-Profit Association" that limits liabilities for its members without requiring state filling or registration for its members. It is essentially a partnership with a non-profit motive. It can pay taxes on their behalf and hold property in its own name. \nHuman: ${question}`
}
