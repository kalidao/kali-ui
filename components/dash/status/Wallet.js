import React from 'react'
import { ConnectBox } from '../../../styles/User'
import useENS from "../../hooks/useENS";
import Image from 'next/image';
import { truncateAddress } from "../../../utils/formatters";

export default function Wallet({ account, connect }) {
  const { ensName, ensAvatar } = useENS(account);

  return (
    // TODO: Add disconnect wallet
    // TODO: Persist wallet state 
    <ConnectBox as="button" onClick={connect}>
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
      {account ? ensName || truncateAddress(account) : "Connect Wallet"}
    </ConnectBox>
  )
}
