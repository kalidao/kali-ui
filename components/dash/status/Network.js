import { styled } from '../../../styles/stitches.config';
import { useNetwork } from 'wagmi';

export const Network = styled('div', {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  borderRadius: "2rem",
  margin: "0px 6px",  
  padding: "6px 14px",
  
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "19px",

  
  variants: {
    variant: {
      "green": {
        color: "$green",
        border: "1px solid $green",
      },
      "yellow": {
        color: "$yellow",
        border: "1px solid $yellow",
      },
      "red": {
        color: "$red",
        border: "1px solid $red",
      }
    }
  }
});

export const Dot = styled('div', {
  width: "8px",
  height: "8px",
  borderRadius: "2rem",
  
  variants: {
    variant: {
      "green": {
        background: "$green",
      },
      "yellow": {
        background: "$yellow",
      },
      "red": {
        background: "$red",
      }
    }
  }
});

export default function NetworkComponent() {
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
        <Network variant="green">
          <Dot variant="green"/>{activeChain?.name}
        </Network> : 
        <Network variant="red">
          <Dot variant="red" />Not Connected
        </Network>
      } 
    </>);
}
