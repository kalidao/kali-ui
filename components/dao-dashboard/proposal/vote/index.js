import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from '../../../../styles/elements'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs'
import { useAccount, useSigner, useContractWrite } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { AddressZero } from '@ethersproject/constants'
import { uploadVoteSignature, fetchVoteSignatures } from '../../../tools/ipfsHelpers'
import { getMembers } from '../../../../graph/queries'

export default function Vote({ proposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const [response, setResponse] = useState(null)
  const [members, setMembers] = useState(null)

  // const votingPeriod = proposal['dao']['votingPeriod']
  // console.log('votingPeriod', votingPeriod)
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { data: voteData, writeAsync: vote } = useContractWrite(
    {
      addressOrName: daoAddress ?? AddressZero,
      contractInterface: DAO_ABI,
    },
    'vote',
    {
      onSuccess() {
        console.log('vote', voteData)
      },
    },
  )

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
        // if (members?.members[i].address.toLowerCase() === user?.address.toLowerCase()) {
        // }
      }
    } else {
      console.log('members not found')
    }

    // getVote()
  }, [response])

  const sign = async () => {
    const domain = {
      name: 'KALI',
      version: '1',
      chainId: Number(chainId),
      verifyingContract: daoAddress,
    }

    const types = {
      SignVote: [
        { name: 'signer', type: 'address' },
        { name: 'proposal', type: 'uint256' },
        { name: 'approve', type: 'bool' },
      ],
    }

    const message = {
      signer: account?.address,
      proposal: Number(proposal['serial']),
      approve: true,
    }

    // console.log(signer, domain, types, message)
    const signature = await signer._signTypedData(domain, types, message)
    return signature
  }

  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

  const disabled = proposal['sponsored'] === null || left > 0 ? true : false

  const castVote = useCallback(
    async (approval) => {
      const signature = await sign()
      uploadVoteSignature(daoAddress, Number(chainId), proposal['serial'], approval, account?.address, signature)

      // console.log(1)
      // if (!proposal || !account) return
      // console.log(2)

      // try {
      //   const data = await vote({ args: [proposal['serial'], approval] })
      //   const instance = new ethers.Contract(daoAddress, DAO_ABI, signer)
      //   const siganture = await instance.voteBySig(account?.address, proposal['serial'], approval, v, r, s)
      //   console.log(siganture)
      //   const data = await voteBySig({ args: [account?.address, proposal['serial'], approval, v, r, s] })
      // } catch (e) {
      //   console.log('error is ', e)
      // }
      // console.log(3)
    },
    [account, proposal],
  )

  const getVote = async () => {
    let votes
    if (members.length > 0) {
      votes = await fetchVoteSignatures(daoAddress, proposal['serial'], members)
      console.log(votes)
    }
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
        <BsFillHandThumbsUpFill color={disabled ? 'hsl(0, 0%, 20%)' : 'hsl(151, 55.0%, 41.5%)'} />
      </Box>
    </>
  )
}
