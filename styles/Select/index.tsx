import * as styles from './select.css'
import { Field, Box } from '@kalidao/reality'

type Props = {
  name?: string
  label: string
  error?: string
  options: Array<{ label: string; value: string }>
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  defaultValue: string
  disabled?: boolean
}

export function Select({ name, label, disabled, error, options, onChange, defaultValue }: Props) {
  const hasError = error ? true : undefined

  return (
    <Field label={label}>
      <Box
        as="select"
        name={name}
        className={[styles.select, disabled && styles.disabled, hasError && styles.error]}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <Box as="option" value={option.value}>
            {option.label}
          </Box>
        ))}
      </Box>
    </Field>
  )
}
