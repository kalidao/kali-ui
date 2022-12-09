import { Stack, Button, IconClose } from '@kalidao/reality'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as styles from './styles.css'

function DialogContent({ children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay}>
        <DialogPrimitive.Content className={styles.content} {...props}>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  )
}

// Exports
export const DialogDescription = <DialogPrimitive.Description className={styles.description} />

export const DialogClose = () => {
  return (
    <DialogPrimitive.Close asChild>
      <Button shape="circle" size="small" tone="red" variant="secondary">
        <IconClose />
      </Button>
    </DialogPrimitive.Close>
  )
}

type Props = {
  open?: boolean 
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description?: string
  trigger: React.ReactNode
  children: React.ReactNode
}

export const Dialog = ({ open, onOpenChange, title, description, trigger, children }: Props) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger className={styles.trigger}>{trigger}</DialogPrimitive.Trigger>
      <DialogContent>
        <Stack direction={'horizontal'} align="center" justify="space-between">
          <DialogPrimitive.Title className={styles.title}>{title}</DialogPrimitive.Title>
          <DialogClose />
        </Stack>

        <DialogPrimitive.Description className={styles.description}>{description}</DialogPrimitive.Description>
        {children}
      </DialogContent>
    </DialogPrimitive.Root>
  )
}
