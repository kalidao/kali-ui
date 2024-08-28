import { init, send } from 'emailjs-com'

export const templates = {
  deployment: 'template_c37vmuw',
}

init(process.env.NEXT_PUBLIC_EMAIL_ID as string)

export const handleEmail = async (template: string, params: Record<string, unknown>) => {
  await send('default_service', template, params).then(
    function (response) {
      console.log('EMAIL SUCCESS!', response.status, response.text)
    },
    function (error) {
      console.log('EMAIL FAILED!', error)
    },
  )
}
