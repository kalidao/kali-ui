import React, { useCallback } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import {
  Box,
  Button,
  IconMenu,
  IconMoon,
  IconSun,
  IconTwitter,
  IconDiscord,
  IconGitHub,
  Stack,
  Text,
  useTheme,
} from '@kalidao/reality'
import { arrow, icon, content, item, itemLink, label, trigger, separator } from './menu.css'
import { useIsMounted } from '@components/hooks/useIsMounted'
import { useThemeStore } from '@components/hooks/useThemeStore'
import { setThemeMode } from '@utils/cookies'
import { ReactNodeNoStrings } from '@kalidao/reality/dist/types/types'

export const Menu = () => {
  const isMounted = useIsMounted()
  const { mode, setMode } = useTheme()
  const toggleModeState = useThemeStore((state) => state.toggleMode)

  const toggleMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    setThemeMode(nextMode)
    toggleModeState()
  }, [mode, setMode, toggleModeState])

  return (
    <Box>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild className={trigger}>
          <Button shape="circle">
            <IconMenu aria-label="Menu" className={icon} />
          </Button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content className={content}>
            <Item label="Getting Started" href="/" isExternal={false} />
            <Item label="Services" href="/services" isExternal={false} />
            <Item
              type="button"
              icon={mode === 'dark' ? <IconSun /> : <IconMoon />}
              label={mode === 'dark' ? 'Light' : 'Dark'}
              onClick={toggleMode}
            />
            <DropdownMenuPrimitive.Separator className={separator} />
            <DropdownMenuPrimitive.Label className={label}>Socials</DropdownMenuPrimitive.Label>
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <IconTwitter aria-label="Twitter" />
                  <Text>Twitter</Text>
                </Stack>
              }
              href="https://twitter.com/kali__gg"
            />
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <IconDiscord aria-label="Twitter" />
                  <Text>Discord</Text>
                </Stack>
              }
              href="http://discord.gg/UKCS9ghzUE"
            />
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <IconGitHub aria-label="Twitter" />
                  <Text>GitHub</Text>
                </Stack>
              }
              href="https://github.com/kalidao/"
            />
            <DropdownMenuPrimitive.Arrow className={arrow} />
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </Box>
  )
}

type ItemProps = {
  icon?: ReactNodeNoStrings
  label: React.ReactNode
  href?: string
  isExternal?: boolean
  type?: 'button' | 'link'
  onClick?: () => void
}

export const Item = ({ type = 'link', label, href, onClick, icon, isExternal = true }: ItemProps) => {
  if (type === 'button') {
    return (
      <Button onClick={onClick} variant="transparent" size="small" width="full" prefix={icon}>
        <DropdownMenuPrimitive.Item>{label}</DropdownMenuPrimitive.Item>
      </Button>
    )
  }
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noreferrer noopener' : ''}
      className={itemLink}
    >
      <DropdownMenuPrimitive.Item className={item}>
        <Text>{label}</Text>
      </DropdownMenuPrimitive.Item>
    </a>
  )
}
