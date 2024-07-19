import React from 'react'
import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Menu as MenuIcon, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export const Menu = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="text-foreground h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/create">Getting Started</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/services">Services</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Socials</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <a
            href="https://twitter.com/kali__gg"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center"
          >
            <span>X</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="http://discord.gg/UKCS9ghzUE"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center"
          >
            <span>Discord</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="https://github.com/kalidao/" target="_blank" rel="noreferrer noopener" className="flex items-center">
            <span>GitHub</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
