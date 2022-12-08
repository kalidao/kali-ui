import React from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as styles from './styles.css'
import { Button, Stack } from '@kalidao/reality'

type Props = {
  onClick: () => void
  message: string
  description: string
  title: string
  children: React.ReactNode
}

export const Alert = ({ onClick, message, description, title, children }: Props) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className={styles.overlay} />
      <AlertDialog.Content className={styles.content}>
        <AlertDialog.Title className={styles.title}>{title}</AlertDialog.Title>
        <AlertDialog.Description className={styles.description}>{description}</AlertDialog.Description>
        <Stack direction={'horizontal'}>
          <AlertDialog.Cancel asChild>
            <Button tone="red">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button onClick={onClick} tone="green">
              {message}
            </Button>
          </AlertDialog.Action>
        </Stack>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)
