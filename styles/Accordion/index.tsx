import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as styles from './styles.css'
import { Box, IconChevronDown } from '@kalidao/reality'

// Exports

type Props = {
  type: any
  defaultValue?: string
  collapsible?: boolean
  children: React.ReactNode
}

export const Accordion = ({ type, defaultValue, collapsible, children }: Props) => {
  return (
    <AccordionPrimitive.Root type={type} defaultValue={defaultValue} collapsible={collapsible} className={styles.root}>
      {children}
    </AccordionPrimitive.Root>
  )
}

export const AccordionItem = ({ children, value }: { children: React.ReactNode; value: string }) => {
  return (
    <AccordionPrimitive.Item value={value} className={styles.item}>
      {children}
    </AccordionPrimitive.Item>
  )
}

export const AccordionTrigger = ({ children, ...props }: { children: React.ReactNode }) => (
  <AccordionPrimitive.Header className={styles.header}>
    <AccordionPrimitive.Trigger className={styles.trigger} {...props}>
      {children}
      <IconChevronDown className={styles.chevron} aria-hidden />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)

export const AccordionContent = ({ children, ...props }: { children: React.ReactNode }) => (
  <AccordionPrimitive.Content className={styles.content} {...props}>
    <Box paddingLeft="15" paddingRight="20">
      {children}
    </Box>
  </AccordionPrimitive.Content>
)
