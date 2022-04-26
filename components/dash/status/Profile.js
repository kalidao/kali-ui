import useENS from "../../hooks/useENS";
import { styled } from "../../../styles/stitches.config";
import { truncateAddress } from "../../../utils/formatters";
import { CopyIcon } from "@radix-ui/react-icons"; 
import { copy } from "../../../utils/";
import Avatar from "./Avatar";

const ProfileBox = styled('div', {
  background: '$lightgray',
  margin: '10px 0px',
  padding: '6px 14px',
  borderRadius: '0.5rem',
});

const Profile = styled('div', {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "6px 14px",
  fontWeight: "500",
});

const Utilities = styled('div', {
  display: "flex",
  gap: "1rem",
  padding: "6px 14px"
});

const Utility = styled('button', {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "$blackAlpha",
  padding: "0.2rem 0.6rem",
  borderRadius: "1rem",
  fontWeight: "500",

  '&:hover': { backgroundColor: '$darkgray' },
});

export default function ProfileComponent({ address, ensName }) {
  const { ensAvatar } = useENS(address);
  
  return (
    <ProfileBox>
        <Profile>
          <Avatar ensAvatar={ensAvatar} />
          {ensName ? ensName : truncateAddress(address)}
        </Profile>
        <Utilities>
          <Utility onClick={() => copy(address)}>
            <CopyIcon />
            Copy address
          </Utility>
          {/* TODO: Add view on explorer */}
          <Utility as="a" href={``}>
            <CopyIcon />
            View on Explorer
          </Utility>
        </Utilities>
    </ProfileBox>
  )
}
