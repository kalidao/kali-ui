import type { AppProps } from 'next/app'
import '@design/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  DisclaimerComponent,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar'
import { xdai } from '@constants/chains'
import { ThemeProvider } from '@kalidao/reality'
import '@kalidao/reality/styles'

const queryClient = new QueryClient()

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.arbitrum, chain.optimism, xdai, chain.goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    jsonRpcProvider({
      rpc: (c) => {
        if (c.id === xdai.id) return { http: process.env.NEXT_PUBLIC_QUICKNODE_GNOSIS! }
        if (c.id === chain.arbitrum.id || c.id === chain.goerli.id)
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
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={lightTheme({
            accentColorForeground: '#ededed',
          })}
          appInfo={appInfo}
          modalSize="compact"
        >
          <ThemeProvider defaultAccent="violet" defaultMode="light">
            <NextNProgress color="#5842c3" />
            <Component {...pageProps} />
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default MyApp
