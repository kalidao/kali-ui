import Layout from '../../components/layout'
import UserDAOs from '../../components/user-daos/'
import NewDaoSquare from '../../components/my-daos/NewDaoSquare'
import { useRouter } from 'next/router'
import { useEnsAddress, useEnsName, useNetwork } from 'wagmi'
// import { graph } from '../../constants/graph';
// import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import { truncateAddress } from '../../utils/formatters'
// TODO: Error page is not an address
export default function UserDAOsPage() {
  const router = useRouter()
  const { data } = useEnsName({
    addressOrName: router.query.user,
    chainId: 1,
  })

  return (
    <Layout heading={data ? data : truncateAddress(router.query.user)}>
      <UserDAOs address={router.query.user} />
      <NewDaoSquare />
    </Layout>
  )
}
