import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Controller } from 'react-hook-form'
import * as styles from './styles.css'
import { Stack, Text } from '@kalidao/reality'

export const Switch = (props: any) => (
  <Controller
    {...props}
    render={({ field }) => (
      <Stack direction={'horizontal'} align="center" justify={'space-between'}>
        <Text variant="label">{props?.label}</Text>
        <SwitchPrimitive.Root
          className={styles.root}
          {...field}
          value={undefined}
          checked={field.value}
          onCheckedChange={field.onChange}
        >
          <SwitchPrimitive.Thumb className={styles.thumb} />
        </SwitchPrimitive.Root>
      </Stack>
    )}
  />
)

export default Switch
