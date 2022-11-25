import React, { useCallback } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Box, Button, IconMenu, IconMoon, IconSun, Stack, Text, useTheme } from '@kalidao/reality'
import { TwitterLogoIcon, GitHubLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons'
import { arrow, icon, content, item, itemLink, label, separator } from './menu.css'
import { useIsMounted } from '@components/hooks/useIsMounted'
import { useThemeStore } from '@components/hooks/useThemeStore'
import { setThemeMode } from '@utils/cookies'

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
        <DropdownMenuPrimitive.Trigger asChild>
          <Button shape="circle" variant="transparent">
            <IconMenu aria-label="Menu" className={icon} />
          </Button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content className={content}>
            <Item label="Getting Started" href="/" />
            <Item label="Services" href="/services" />
            <Item
              type="button"
              label={
                mode === 'dark' ? (
                  <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                    <IconSun />
                    <Text>Light</Text>
                  </Stack>
                ) : (
                  <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                    <IconMoon />
                    <Text>Dark</Text>
                  </Stack>
                )
              }
              onClick={toggleMode}
            />
            <DropdownMenuPrimitive.Separator className={separator} />
            <DropdownMenuPrimitive.Label className={label}>Socials</DropdownMenuPrimitive.Label>
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <TwitterLogoIcon aria-label="Twitter" />
                  <Text>Twitter</Text>
                </Stack>
              }
              href="https://twitter.com/kali__gg"
            />
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <DiscordLogoIcon aria-label="Twitter" />
                  <Text>Discord</Text>
                </Stack>
              }
              href="http://discord.gg/UKCS9ghzUE"
            />
            <Item
              label={
                <Stack direction={'horizontal'} align="center" justify={'flex-start'}>
                  <GitHubLogoIcon aria-label="Twitter" />
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
  label: React.ReactNode
  href?: string
  type?: 'button' | 'link'
  onClick?: () => void
}

export const Item = ({ type = 'link', label, href, onClick }: ItemProps) => {
  if (type === 'button') {
    return (
      <Box as="button" onClick={onClick} className={itemLink}>
        <DropdownMenuPrimitive.Item className={item}>{label}</DropdownMenuPrimitive.Item>
      </Box>
    )
  }

  return (
    <a href={href} target="_blank" className={itemLink}>
      <DropdownMenuPrimitive.Item className={item}>{label}</DropdownMenuPrimitive.Item>
    </a>
  )
}
