import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { styled } from '../../../styles/stitches.config'
import Network from './Network';
import Wallet from './Wallet';

export const UserBar = styled('div', {
  display: "flex",
  marginRight: "1rem"
});

export default function User() {
  const value = useContext(AppContext);
  const { account, chainId } = value.state;

  return (
    <UserBar>
        <Network chainId={chainId} />
        <Wallet />
    </UserBar>
  )
}
