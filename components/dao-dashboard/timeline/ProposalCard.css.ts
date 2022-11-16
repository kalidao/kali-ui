import { style } from '@vanilla-extract/css'
import { vars } from '@kalidao/reality'

export const linkStyle = style({
  color: vars.colors.background,
  textDecoration: 'none',
})

export const proposalCard = style({
  padding: vars.space['6'],
  borderRadius: vars.radii['2xLarge'],
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  background: vars.colors.backgroundTertiary,
  minWidth: vars.space.full,
})
