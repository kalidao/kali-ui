import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Text } from '../../../../styles/elements'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs'
import { useAccount, useSigner, useContractWrite, useContractRead, useContract, useSignTypedData } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { AddressZero } from '@ethersproject/constants'
import { uploadVoteData, fetchVoteData } from '../../../tools/ipfsHelpers'
import { getMembers } from '../../../../graph/queries'
import { ethers } from 'ethers'

export default function Vote({ proposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const [members, setMembers] = useState(null)
  const [voteApproval, setVoteApproval] = useState(null)

  const { data: account } = useAccount()

  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()
  const disabled = proposal['sponsored'] === null || left > 0 ? true : false
  const votingEnded = left > 0 ? false : true

  const { data: daoName } = useContractRead(
    {
      addressOrName: daoAddress ?? AddressZero,
      contractInterface: DAO_ABI,
    },
    'name',
    {
      onSuccess() {
        // console.log('daoName', daoName)
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
    onSettled(data, error) {
      console.log('Settled', { data, error })
    },
  })

  useEffect(() => {
    let mounted = true
    const fetchMembers = async () => {
      let _members = []
      const result = await getMembers(Number(chainId), daoAddress)
      const members = result?.data?.daos?.[0].members
      if (members) {
        for (let i = 0; i < members.length; i++) {
          if (members[i].address) {
            const member = members[i].address
            _members.push(member)
            setMembers([..._members])
          }
        }
      } else {
        console.log('members not found')
      }
    }

    fetchMembers()
    return () => {
      mounted = false
    }
  }, [])

  // Submit vote data to IPFS (SEE IF POSSIBLE TO MOVE INTO CASTVOTE)
  useEffect(() => {
    if (signedData) {
      uploadVoteData(daoAddress, Number(chainId), proposal['serial'], voteApproval, account?.address, signedData)
      setVoteApproval(null)
    }
  }, [signedData])

  useEffect(() => {
    // console.log(proposal, votingEnded)
    const fetchSignedVotes = async () => {
      console.log(members)
      let _votes = []
      if (!disabled) {
        const votes = await fetchVoteData(daoAddress, proposal['serial'], members)

        console.log(proposal['serial'], votes)
      }
    }
    if (members) {
      fetchSignedVotes()
    }
  }, [members])

  const castVote = useCallback(
    async (approval) => {
      signTypedData({
        domain: {
          name: daoName,
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
          signer: ethers.utils.getAddress(account?.address),
          proposal: Number(proposal['serial']),
          approve: approval,
        },
      })
      setVoteApproval(approval)
    },
    [account, proposal],
  )

  const processSignedVotes = async () => {
    let votes
    if (members.length > 0) {
      votes = await fetchVoteData(daoAddress, proposal['serial'], members)
      const encodedData = await encodeData(votes)
      console.log(votes, encodedData)

      // Multicall
      if (encodedData) {
        try {
          const mc = await multicall({
            args: [encodedData],
            overrides: {
              gasLimit: 1050000,
            },
          })
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const encodeData = async (votes) => {
    let data = []
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].signature) {
        const { r, s, v } = ethers.utils.splitSignature(votes[i].signature)
        console.log([votes[i].member, votes[i].signature, Number(proposal['serial']), votes[i].approval, v, r, s])

        // Encode data for multicall
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
      } else {
        console.log('No signature found')
        data = null
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
      {votingEnded && (
        <Button variant="cta" onClick={() => processSignedVotes()}>
          Tally Votes
        </Button>
      )}
    </>
  )
}
