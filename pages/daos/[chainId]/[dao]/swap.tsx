import Layout from '@components/dao-dashboard/layout'
import Info from '@components/dao-dashboard/crowdsale/Info'
import { Box } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { erc20ABI, useContractRead, useContractReads } from 'wagmi'
import { addresses } from '@constants/addresses'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import DAO_ABI from '@abi/KaliDAO.json'
import Background from '@components/dao-dashboard/crowdsale/Background'
import History from '@components/dao-dashboard/crowdsale/History'
import Swap from '@components/dao-dashboard/crowdsale/'

export default function CrowdsalePage() {
  const router = useRouter()
  const daoAddress = router.query.dao ? (router.query.dao as string) : AddressZero
  const chainId = Number(router.query.chainId)
  const swapAddress = chainId && addresses[chainId].extensions.crowdsale2
  const { data: swap } = useContractRead({
    addressOrName: swapAddress,
    contractInterface: SWAP_ABI,
    chainId: chainId,
    functionName: 'crowdsales',
    args: [daoAddress],
  })
  const tokenContract = {
    addressOrName: swap ? swap?.purchaseAsset : AddressZero,
    contractInterface: erc20ABI,
    chainId: chainId,
  }
  const daoContract = {
    addressOrName: daoAddress ? daoAddress : AddressZero,
    contractInterface: DAO_ABI,
    chainId: chainId,
  }
  const swapContract = {
    addressOrName: swapAddress ? swapAddress : AddressZero,
    contractInterface: SWAP_ABI,
    chainId: chainId,
  }
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...tokenContract,
        functionName: 'name',
      },
      {
        ...tokenContract,
        functionName: 'symbol',
      },
      {
        ...tokenContract,
        functionName: 'decimals',
      },
      {
        ...daoContract,
        functionName: 'name',
      },
      {
        ...daoContract,
        functionName: 'symbol',
      },
    ],
    enabled: !!swap && swap?.purchaseAsset != AddressZero,
  })
  console.log('crowdsale', swap, data)
  return (
    <Layout title="Swap" content="Swap Eth or tokens">
      
      <Box>
        <Info
          swap={swap}
          tokenDecimals={data ? Number(data?.[2]) : 18}
          tokenSymbol={data ? data?.[1].toString() : ''}
          daoSymbol={data ? data?.[4].toString() : ''}
        />
        <Background />
        <Swap crowdsale={swap} daoAddress={daoAddress} chainId={chainId ? chainId : 1} />
        <History daoAddress={daoAddress} daoSymbol={data ? data?.[4].toString() : ''} chainId={chainId ? chainId : 1} purchaseMultiplier={swap?.purchaseMultiplier} tokenDecimals={data ? Number(data?.[2]) : 18} />
      </Box>
    </Layout>
  )
}
