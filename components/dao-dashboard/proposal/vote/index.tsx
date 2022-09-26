import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box } from '../../../../styles/elements'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs'
import { useAccount, useContractWrite } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { ethers } from 'ethers'

// TODO: add actual types
type VoteProps = {
  proposal: any
}

export default function Vote({ proposal }: VoteProps) {
  const router = useRouter()
  const { chainId, dao: daoAddress } = router.query
  const { isConnected } = useAccount()
  const { data, writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: daoAddress ? daoAddress.toString() : ethers.constants.AddressZero,
    contractInterface: DAO_ABI,
    chainId: Number(chainId),
    functionName: 'vote',
    onSuccess() {
      console.log('vote', data)
    },
  })

  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

  const disabled = proposal['sponsored'] === null || left > 0 || !writeAsync ? true : false

  const vote = useCallback(
    async (approval: Boolean) => {
      console.log(1)
      if (!proposal || !isConnected) return
      console.log(2)
      try {
        const data = await writeAsync({
          recklesslySetUnpreparedArgs: [proposal['serial'], approval],
        })
      } catch (e) {
        console.log('error', e)
      }
      console.log(3)
    },
    [isConnected, proposal],
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
