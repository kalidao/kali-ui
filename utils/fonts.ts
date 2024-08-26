import { Fira_Mono as FontMono, Inter as FontSans } from 'next/font/google'

export const sans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: 'variable',
})

export const mono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
})
