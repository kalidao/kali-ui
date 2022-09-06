import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box } from '../../../../styles/elements'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { AddressZero } from '@ethersproject/constants'

export default function Vote({ proposal }) {
  const router = useRouter()
  const { chainId, dao: daoAddress } = router.query

  // const votingPeriod = proposal['dao']['votingPeriod']
  // console.log('votingPeriod', votingPeriod)
  const { data: account } = useAccount()
  const { config, error } = usePrepareContractWrite({
    addressOrName: daoAddress,
    contractInterface: DAO_ABI,
    chainId,
    functionName: 'vote',
    args: [proposal?.['serial'], false],
    cacheTime: 2_000,
    onError(usePrepareContractWriteError) {
      console.log({ usePrepareContractWriteError }, { daoAddress }, { DAO_ABI })
    },
  })
  const { data, isLoading, writeAsync } = useContractWrite({
    ...config,
    onSuccess() {
      console.log('vote', data)
    },
  })

  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

  const disabled = proposal['sponsored'] === null || left > 0 || !writeAsync ? true : false

  const vote = useCallback(
    async (approval) => {
      console.log(1)
      if (!proposal || !account) return
      console.log(2)
      try {
        const data = await writeAsync({ args: [proposal['serial'], approval] })
      } catch (e) {
        console.log('error', e)
      }
      console.log(3)
    },
    [account, proposal],
  )

  return (
    <>
      <Box as="button" variant={disabled ? 'vote-disabled' : 'vote'} onClick={() => vote(true)}>
        <BsFillHandThumbsUpFill color={disabled ? 'hsl(0, 0%, 20%)' : 'hsl(151, 55.0%, 41.5%)'} />
      </Box>
      <Box as="button" variant={disabled ? 'vote-disabled' : 'vote'} onClick={() => vote(false)}>
        <BsFillHandThumbsDownFill color={disabled ? 'hsl(0, 0%, 20%)' : 'hsl(10, 80.2%, 35.7%)'} />
      </Box>
    </>
  )
}
