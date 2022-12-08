import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import * as styles from './styles.css'
import { Stack, Box, Text } from '@kalidao/reality'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description: React.ReactNode
  action?: React.ReactNode
  alt?: string
}

const Toast = ({ open, setOpen, title, description, action, alt }: Props) => {
  const timerRef = React.useRef(0)

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root className={styles.root} open={open} onOpenChange={setOpen}>
        <Stack>
          <ToastPrimitive.Title className={styles.title}>{title}</ToastPrimitive.Title>
          <ToastPrimitive.Description asChild className={styles.description}>
            <Text>{description}</Text>
          </ToastPrimitive.Description>
        </Stack>
        <ToastPrimitive.Action className={styles.action} asChild altText={alt ? alt : ''}>
          {action}
        </ToastPrimitive.Action>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className={styles.viewport} />
    </ToastPrimitive.Provider>
  )
}

export default Toast
