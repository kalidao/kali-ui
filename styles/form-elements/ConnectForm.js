import { useFormContext } from 'react-hook-form'

export const ConnectForm = ({ children }) => {
  const methods = useFormContext()

  return children({ ...methods })
}
