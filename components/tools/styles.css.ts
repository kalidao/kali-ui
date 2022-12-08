import { vars } from '@kalidao/reality'
import { style } from '@vanilla-extract/css'

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[3],
  padding: vars.space[6],
  backgroundColor: vars.colors.backgroundSecondary,
  borderColor: vars.colors.backgroundTertiary,
  borderWidth: vars.borderWidths[1],
  borderStyle: 'solid',
  borderRadius: vars.radii['2xLarge'],
})
