import { init, send } from 'emailjs-com'

export const templates = {
  deployment: 'template_c37vmuw',
}

init(process.env.NEXT_PUBLIC_EMAIL_ID as string)

export const handleEmail = (template: string, params: Record<string, unknown>) => {
  send('default_service', template, params).then(
    function (response) {
      console.log('EMAIL SUCCESS!', response.status, response.text)
    },
    function (error) {
      console.log('EMAIL FAILED!', error)
    },
  )
}
