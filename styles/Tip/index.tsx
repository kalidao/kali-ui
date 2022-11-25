import { IconExclamationCircleSolid } from '@kalidao/reality'
import * as Tooltip from '@radix-ui/react-tooltip'

type Props = {
  label: string
  children?: React.ReactNode
}

export function Tip({ label, children }: Props) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <IconExclamationCircleSolid />
      </Tooltip.Trigger>
      <Tooltip.Content sideOffset={5}>
        {label}
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
