import React, { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import '@design/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, DisclaimerComponent, Theme } from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, optimism, polygon, arbitrum, goerli } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar'
import { xdai } from '@constants/chains'
import { ThemeProvider } from '@kalidao/reality'
import '@kalidao/reality/styles'
import { useThemeStore } from '@components/hooks/useThemeStore'
import { getRainbowTheme } from '@utils/getRainbowTheme'
import '@design/app.css'

const queryClient = new QueryClient()

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, arbitrum, optimism, xdai, goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID ?? '' }),
    jsonRpcProvider({
      rpc: (c) => {
        if (c.id === xdai.id) return { http: process.env.NEXT_PUBLIC_QUICKNODE_GNOSIS! }
        if (c.id === arbitrum.id || c.id === goerli.id)
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

function MyApp({ Component, pageProps }: AppProps) {
  const mode = useThemeStore((state) => state.mode)
  const [theme, setTheme] = useState<Theme>()

  useEffect(() => {
    setTheme(getRainbowTheme(mode))
  }, [mode])

  return (
    <ThemeProvider defaultAccent="violet" defaultMode={mode}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider coolMode chains={chains} theme={theme} appInfo={appInfo} modalSize="compact">
            <NextNProgress color="#5842c3" />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
