import * as styles from './select.css'
import { Field, Box } from '@kalidao/reality'
import { description } from '@design/Dialog/styles.css'

type Props = {
  name?: string
  label: string
  description?: string
  error?: string
  options: Array<{ label: string; value: string }>
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  defaultValue?: string
  disabled?: boolean
}

export function Select({ name, label, disabled, error, options, onChange, defaultValue }: Props) {
  const hasError = error ? true : undefined

  return (
    <Field label={label}>
      <Box
        as="select"
        name={name}
        defaultValue={defaultValue}
        className={[styles.select, disabled && styles.disabled, hasError && styles.error]}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <Box key={index} as="option" value={option.value}>
            {option.label}
          </Box>
        ))}
      </Box>
    </Field>
  )
}
