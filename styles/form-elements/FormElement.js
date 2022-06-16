import { styled } from '../stitches.config'

const FormElement = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  variants: {
    variant: {
      vertical: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '0.5rem',
      },
    },
  },
})

export default FormElement
