import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Box, Button, IconMenu, Stack, Text } from '@kalidao/reality'
import { TwitterLogoIcon, GitHubLogoIcon, DiscordLogoIcon } from '@radix-ui/react-icons'
import { arrow, icon, content, item, itemLink, label, separator } from './menu.css'

export const Menu = () => {
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
  href: string
}

export const Item = ({ label, href }: ItemProps) => {
  return (
    <a href={href} target="_blank" className={itemLink}>
      <DropdownMenuPrimitive.Item className={item}>{label}</DropdownMenuPrimitive.Item>
    </a>
  )
}
