import React from 'react'
import { styled } from './stitches.config'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { vars } from '@kalidao/reality'

const StyledTabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  width: '90vw',
  boxShadow: `0 2px 10px ${'$gray100'}`,
  color: vars.colors.foreground,
})

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: 'flex',
  borderBottom: `1px solid ${'$purple100'}`,
})

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: vars.colors.backgroundSecondary,
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: '$foreground',
  fontWeight: '500',
  fontFamily: 'Bold',
  userSelect: 'none',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopRightRadius: 6 },
  '&:hover': { color: '$purple200' },
  '&[data-state="active"]': {
    color: '$purple300',
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
})

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  background: vars.colors.background,
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: 'none',
  '&:focus': { boxShadow: `0 0 0 2px black` },
})

export const Tabs = StyledTabs
export const TabsList = StyledList
export const TabsTrigger = StyledTrigger
export const TabsContent = StyledContent
