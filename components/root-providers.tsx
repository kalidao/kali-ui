'use client'
import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, DisclaimerComponent, Locale } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, optimism, polygon, arbitrum, gnosis } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@components/theme-provider'
// import { Provider as AnkrProvider } from 'ankr-react'
import { Toaster } from './ui/toaster'
import { useTheme } from 'next-themes'
import { getRainbowTheme } from '@utils/getRainbowTheme'
import { http } from 'wagmi'
import NextNProgress from 'nextjs-progressbar'

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: 'KALI',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!, // You need to add this
  chains: [mainnet, polygon, arbitrum, optimism, gnosis],
  ssr: true,
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC!),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC!),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC!),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC!),
    [gnosis.id]: http(process.env.NEXT_PUBLIC_GNOSIS_RPC!),
  },
})

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the <Link href="/tos">Terms of Service</Link> and acknowledge you have read
    and understand the Disclaimers therein.
  </Text>
)

const appInfo = {
  appName: 'KALI',
  learnMoreUrl: 'https://docs.kali.gg/',
  disclaimer: Disclaimer,
}

interface RootProvidersProps {
  children: React.ReactNode
}

export function RootProviders({ children }: RootProvidersProps) {
  const { theme } = useTheme()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={getRainbowTheme(theme ?? 'light')} coolMode appInfo={appInfo} modalSize="compact">
            <NextNProgress color="#5842c3" />
            {children}
            <Toaster />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
