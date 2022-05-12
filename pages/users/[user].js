import Layout from '../../components/layout';
import UserDAOs from "../../components/user-daos/"
import NewDaoSquare from '../../components/my-daos/NewDaoSquare';
import { useRouter } from 'next/router';
import { useEnsAddress, useEnsName, useNetwork } from 'wagmi';
import { graph } from '../../constants/graph';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// TODO: Error page is not an address 
export default function UserDAOsPage() {
  const router = useRouter();
  const { data : ensAddress, isError } = useEnsAddress({
    name: router.query.user,
    chainId: 1
})
  console.log('ensAddress', ensAddress)
  const user = ethers.utils.isAddress(router.query.user) ? router.query.user : (ensAddress ? ensAddress : 'Error');
  console.log('user', user)

  const ensName = useEnsName({
      address: user,
      chainId: 1
  })

  return (
    <Layout heading={ensName.data}>
        <UserDAOs address={user} />
        <NewDaoSquare />
    </Layout>  
  );
};