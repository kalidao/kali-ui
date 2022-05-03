import { styled } from '../../../styles/stitches.config';
import { truncateAddress } from "../../../utils/formatters";
import { useAccount, useConnect, useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../../styles/Dialog';
import { useIsMounted } from "../../hooks";
import Profile from "./Profile";
import Avatar from './Avatar';

const Connect = styled('button', {
  border: "none",
  borderRadius: "35px",
  background: "$white",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",

  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",

  // TODO: Add https://optimo.ch/typefaces/px_grotesk screen  
  fontWeight: "800",
  fontSize: "16px",
  lineHeight: "19px",
  padding: "6px 14px",

  // TODO: Add hover animation
  '&:hover': { backgroundColor: '$green' },
})

const Button = styled('button', {
  fontWeight: "700",
  padding: "2px 14px",
  borderRadius: "1rem", 
  width: "100%",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",

  variants: {
    variant: {
      'red': {
        background: '$red'
      },
      'green': {
        background: '$green',
        marginBottom: "0.5rem"
      }
    }
  }
});

export default function Wallet() {
  const isMounted = useIsMounted();
  const { data: account } = useAccount();
  // Fetches ensName and ensAvatar from mainnet
  const { data: ensName } = useEnsName({ address: account?.address, chainId: 1 });
  const { data: ensAvatar } = useEnsAvatar({ address: account?.address, chainId: 1 });
  const { activeConnector, connect, connectors, error, isConnecting, pendingConnector} = useConnect();
  const { disconnect } = useDisconnect();

  console.log('ensName', ensName)
  // TODO: Add error toast if not connected
  return (
    <Dialog>
      <DialogTrigger>
        <Connect onClick={() => connect()}>
          {account ? 
          <>
            <Avatar ensAvatar={ensAvatar}/> 
            {ensName ? ensName : truncateAddress(account.address)}
          </> : 
        "Connect Wallet"} 
      </Connect>        
      </DialogTrigger>
      <DialogContent>
        {
          activeConnector && (
            <>
              <DialogTitle>Profile</DialogTitle>
              <Profile ensName={ensName} ensAvatar={ensAvatar} address={account?.address} />
              <Button onClick={() => disconnect()} variant='red'>
                Disconnect from {activeConnector.name}
              </Button>
            </>
          )
        }
        {
          !account && 
          <>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>
            {/* TODO: Add Checkbox agreeing to Terms of Service here. */}
            By connecting my wallet, I agree to the Terms of Service. 
          </DialogDescription>
          {connectors.filter(connector => isMounted && connector.ready && connector.id !== activeConnector?.id)
          .map(connector => (
            <Button key={connector.id} onClick={() => connect(connector)} variant='green'>
              {isConnecting && connector.id === pendingConnector?.id && 'Connecting to '}{connector.name}
            </Button>
          ))}
          </>
        }
      <DialogClose/>
      </DialogContent>
    </Dialog>
  )
}

