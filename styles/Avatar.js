import { styled } from './stitches.config'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { blackA } from '@radix-ui/colors'

const StyledAvatar = styled(AvatarPrimitive.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 23,
  height: 23,
  borderRadius: '100%',
  backgroundColor: `blackA`,
})

const StyledImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray3',
  color: `$gray11`,
  fontSize: 25,
  fontWeight: '800',
  lineHeight: 1,
  fontWeight: 500,
})

export const Avatar = StyledAvatar
export const AvatarImage = StyledImage
export const AvatarFallback = StyledFallback
