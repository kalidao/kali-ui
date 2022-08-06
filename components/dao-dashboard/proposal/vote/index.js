import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Text } from '../../../../styles/elements'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs'
import { useAccount, useSigner, useContractWrite, useContract, useSignTypedData } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { AddressZero } from '@ethersproject/constants'
import { uploadVoteData, fetchVoteData } from '../../../tools/ipfsHelpers'
import { getMembers } from '../../../../graph/queries'
import { ethers } from 'ethers'

export default function Vote({ proposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const [response, setResponse] = useState(null)
  const [members, setMembers] = useState(null)
  const [voteApproval, setVoteApproval] = useState(null)

  // const votingPeriod = proposal['dao']['votingPeriod']
  // console.log('votingPeriod', votingPeriod)
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  // const { data: voteData, writeAsync: vote } = useContractWrite(
  //   {
  //     addressOrName: daoAddress ?? AddressZero,
  //     contractInterface: DAO_ABI,
  //   },
  //   'vote',
  //   {
  //     onSuccess() {
  //       console.log('vote', voteData)
  //     },
  //   },
  // )

  const { data: voteBySigData, writeAsync: voteBySig } = useContractWrite(
    {
      addressOrName: daoAddress ?? AddressZero,
      contractInterface: DAO_ABI,
    },
    'voteBySig',
    {
      onSuccess() {
        console.log('voteBySig', voteBySigData)
      },
    },
  )

  const { data: multicallData, writeAsync: multicall } = useContractWrite(
    {
      addressOrName: daoAddress ?? AddressZero,
      contractInterface: DAO_ABI,
    },
    'multicall',
    {
      onSettled(data, error) {
        console.log('Settled', { data, error })
      },
    },
  )

  const daoContract = useContract({
    addressOrName: daoAddress ?? AddressZero,
    contractInterface: DAO_ABI,
  })

  const { data: signedData, signTypedData } = useSignTypedData({
    domain: {
      name: 'KALI',
      version: '1',
      chainId: Number(chainId),
      verifyingContract: daoAddress,
    },
    types: {
      SignVote: [
        { name: 'signer', type: 'address' },
        { name: 'proposal', type: 'uint256' },
        { name: 'approve', type: 'bool' },
      ],
    },
    value: {
      signer: account?.address,
      proposal: Number(proposal['serial']),
      approve: true,
    },
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
  })

  useEffect(() => {
    let mounted = true
    const fetchMembers = async () => {
      const result = await getMembers(Number(chainId), daoAddress)
      setResponse(result?.data?.daos?.[0])
    }

    fetchMembers()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let _members = []
    if (response?.members) {
      for (let i = 0; i < response?.members.length; i++) {
        if (response?.members[i].address) {
          const member = response?.members[i].address
          _members.push(member)
          setMembers([..._members])
        }
      }
    } else {
      console.log('members not found')
    }
  }, [response])

  // Submit vote data to IPFS
  useEffect(() => {
    console.log(voteApproval)
    if (voteApproval && signedData) {
      uploadVoteData(daoAddress, Number(chainId), proposal['serial'], voteApproval, account?.address, signedData)
      setVoteApproval(null)
    }
  }, [signedData])

  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

  const disabled = proposal['sponsored'] === null || left > 0 ? true : false

  const castVote = useCallback(
    async (approval) => {
      signTypedData()
      setVoteApproval(approval)
    },
    [account, proposal],
  )

  const getVote = async () => {
    let votes
    if (members.length > 0) {
      votes = await fetchVoteData(daoAddress, proposal['serial'], members)

      const votesData = await getVoteDetail(votes)

      console.log(votesData)

      // try {
      //   const mc = await multicall({
      //     args: [votesData],
      //     overrides: {
      //       gasLimit: 1050000,
      //     },
      //   })
      // } catch (e) {
      //   console.log(e)
      // }
    }
  }

  const getVoteDetail = async (votes) => {
    let data = []
    console.log(votes)
    if (votes) {
      for (let i = 0; i < votes.length; i++) {
        console.log(votes[i].signature)
        const { r, s, v } = ethers.utils.splitSignature(votes[i].signature)

        console.log([votes[i].member, Number(proposal['serial']), votes[i].approval, v, r, s])
        const data_ = daoContract.interface.encodeFunctionData('voteBySig', [
          votes[i].member,
          Number(proposal['serial']),
          votes[i].approval,
          v,
          r,
          s,
        ])
        console.log('vote data - ', data_)
        data.push(data_)
      }
    }
    return data
  }

  return (
    <>
      <Box as="button" variant={disabled ? 'vote-disabled' : 'vote'} onClick={() => castVote(true)}>
        <BsFillHandThumbsUpFill color={disabled ? 'hsl(0, 0%, 20%)' : 'hsl(151, 55.0%, 41.5%)'} />
      </Box>
      <Box as="button" variant={disabled ? 'vote-disabled' : 'vote'} onClick={() => castVote(false)}>
        <BsFillHandThumbsDownFill color={disabled ? 'hsl(0, 0%, 20%)' : 'hsl(10, 80.2%, 35.7%)'} />
      </Box>
      <Box as="button" onClick={() => getVote(true)}>
        <Text>Process Votes</Text>
      </Box>
    </>
  )
}
