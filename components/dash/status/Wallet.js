import { styled } from '../../../styles/stitches.config';
import Image from 'next/image';
import { truncateAddress } from "../../../utils/formatters";
import { useAccount, useConnect, useDisconnect, useEnsName, useEnsAvatar } from "wagmi";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../../styles/User';
import { Cross2Icon } from '@radix-ui/react-icons';
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

  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "19px",
  padding: "6px 14px",

  // TODO: Add hover animation
  '&:hover': { backgroundColor: '$green' },
})

const ConnectProfile = styled('div', {

});

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

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$red',
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: '$redAlpha' },
  '&:focus': { boxShadow: `0 0 0 2px $redAlpha` },
});

const CloseButton = () => {
  return <IconButton>
    <Cross2Icon />
  </IconButton>
}

export default function Wallet() {
  const isMounted = useIsMounted();
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const { activeConnector, connect, connectors, error, isConnecting, pendingConnector} = useConnect();
  const { disconnect } = useDisconnect();

  return (
    // TODO: Add disconnect wallet
    // TODO: Persist wallet state 
    <Dialog>
      <DialogTrigger>
        <Connect>{account ? <ConnectProfile> <Avatar /> {ensName} </ConnectProfile> || truncateAddress(account.address) : "Connect Wallet"} </Connect>
        {/* TODO: Add ens avatar */}
        {/* {ensAvatar && (
          <Image
            src={ensAvatar}
            alt={account}
            rounded="full"
            height={25}
            width={25}
            marginRight={2}
          />
        )} */}
        
      </DialogTrigger>
      <DialogContent>
        {
          activeConnector && (
            <>
              <DialogTitle>Profile</DialogTitle>
              <Profile ensName={ensName} address={account.address} />
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
        <DialogClose>
          <CloseButton />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

