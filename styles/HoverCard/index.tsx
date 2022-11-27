import React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import * as styles from './styles.css'

type Props = {
  trigger: React.ReactNode
  children: React.ReactNode
  link: string
}

const HoverCard = ({ trigger, link, children }: Props) => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>
      <a href={link}>{trigger}</a>
    </HoverCardPrimitive.Trigger>
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content className={styles.content} sideOffset={5}>
        {children}
        <HoverCardPrimitive.Arrow className={styles.arrow} />
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  </HoverCardPrimitive.Root>
)

export default HoverCard
