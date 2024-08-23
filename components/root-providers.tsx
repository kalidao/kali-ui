import React from 'react'
import {
  getDefaultWallets,
  lightTheme,
  darkTheme,
  RainbowKitProvider,
  DisclaimerComponent,
} from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, optimism, polygon, arbitrum, gnosis } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@components/theme-provider'
import { Provider as AnkrProvider } from 'ankr-react'
import { Toaster } from './ui/toaster'
import { useTheme } from 'next-themes'
import { getRainbowTheme } from '@utils/getRainbowTheme'

const queryClient = new QueryClient()

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, arbitrum, optimism, gnosis],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID ?? '' }),
    jsonRpcProvider({
      rpc: (c) => {
        if (c.id === gnosis.id) return { http: process.env.NEXT_PUBLIC_QUICKNODE_GNOSIS! }
        if (c.id === arbitrum.id)
          return { http: process.env.NEXT_PUBLIC_QUICNODE_HTTP!, webSocket: process.env.NEXT_PUBLIC_QUICKNODE }
        return null
      },
    }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'KALI',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
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
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            theme={getRainbowTheme(theme)}
            coolMode
            chains={chains}
            appInfo={appInfo}
            modalSize="compact"
          >
            <AnkrProvider apiKey={process.env.NEXT_PUBLIC_ANKR_API_KEY}>
              {children}
              <Toaster />
            </AnkrProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
