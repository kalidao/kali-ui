import * as styles from './styles.css'
import { Field, Box } from '@kalidao/reality'

type Props = {
  name?: string
  label: string
  description?: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  defaultValue?: string
}

export function DateInput({ name, label, disabled, error, onChange, defaultValue }: Props) {
  const hasError = error ? true : undefined

  return (
    <Field label={label}>
      <Box
        as="input"
        name={name}
        type="datetime-local"
        defaultValue={defaultValue}
        className={styles.container}
        onChange={onChange}
        disabled={disabled}
        maxWidth={'56'}
      ></Box>
    </Field>
  )
}
