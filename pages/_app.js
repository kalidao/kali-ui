import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';
import { MoralisProvider } from "react-moralis";
import { ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import { GRAPH_URL } from '../graph/';

const apolloClient = new ApolloClient({
  uri: GRAPH_URL[1],
  cache: new InMemoryCache()
});

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.arbitrum, chain.rinkeby],
  [
    apiProvider.infura(process.env.NEXT_PUBLIC_INFURA_ID),
    apiProvider.fallback()
  ]
);
  
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
  
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function MyApp({ Component, pageProps }) {
  return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider 
          coolMode
          chains={chains} 
          theme={darkTheme({
            accentColor: '#C28813',
            accentColorForeground: '#D5D1D1',
          })}
        >
          <ApolloProvider client={apolloClient}>
            <MoralisProvider serverUrl='https://amaolyvrejmm.usemoralis.com:2053/server' appId='iQgEQixJugOhHzXRq1pRPoJEmdbKA67o1veRSFRB'>
              <Component {...pageProps} />
            </MoralisProvider>
          </ApolloProvider>   
        </RainbowKitProvider>
      </WagmiProvider>
  );
}

export default MyApp;
