import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { styled } from "../../../styles/stitches.config";
import { truncateAddress } from "../../../utils/formatters";

const ProfileBox = styled('div', {
    background: '$lightgray',
    margin: '10px 0px',
    padding: '6px 14px',
    borderRadius: '0.5rem',
});

export default function Profile({ address, ensName}) {
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address});

  return (
    <ProfileBox>
        {ensAvatar}{ensName ? ensName : truncateAddress(address)}
        {/* Add Link to Etherscan, Add Copy Address */}
    </ProfileBox>
  )
}
