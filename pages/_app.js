import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';
import { providers } from 'ethers';

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
          <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default MyApp;
