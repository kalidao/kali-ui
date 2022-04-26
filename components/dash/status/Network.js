import { NetworkBox, Dot } from '../../../styles/User'
import { useNetwork } from 'wagmi'

export default function Network({ chainId }) {
  const {
    activeChain,
    chains,
    error,
    isLoading,
    pendingChainId,
    switchNetwork,
  } = useNetwork()

  // TODO: Add Connecting state
  // TODO: Add Switch Network
  console.log('activeChain', activeChain)
  return (
    <>
      {activeChain ? 
        <NetworkBox color="green">
          <Dot color="green"/>{activeChain?.name}
        </NetworkBox> : 
        <NetworkBox color="red">
          <Dot color="red" />Not Connected
        </NetworkBox>
      }
    </>
  );
}
