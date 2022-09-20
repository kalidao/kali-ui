import type { AppProps } from 'next/app'
import '@design/styles.css'
import globalStyles from '@design/globalStyles'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { MoralisProvider } from 'react-moralis'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from "nextjs-progressbar";
const queryClient = new QueryClient()

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.arbitrum, chain.optimism, chain.rinkeby, chain.goerli],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }), publicProvider()],
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

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={darkTheme({
            accentColor: 'hsl(250, 51.8%, 51.2%)',
            accentColorForeground: '#ededed',
          })}
        >
          <MoralisProvider serverUrl="https://amaolyvrejmm.usemoralis.com:2053/server" appId="NEXT_PUBLIC_MORALIS_ID">
            <NextNProgress color="#5842c3" />
            <Component {...pageProps} />
          </MoralisProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}

export default MyApp
