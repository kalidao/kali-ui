import React, { useState, useEffect } from 'react'
import { styled } from '../../../../styles/stitches.config'
import { Button, Flex, Text } from '../../../../styles/elements'
import { Dialog, DialogTrigger, DialogContent } from '../../../../styles/Dialog'
import { NewProposalModal } from '../../newproposal/'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DAO_MEMBERS } from '../../../../graph'
import { useBalance } from 'wagmi'
import { ethers } from 'ethers'
import { useGraph } from '../../../hooks'
import Info from '../../../../styles/Info'
import { getMembers } from '../../../../graph/queries'

export default function ProfileComponent({ dao }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = Number(router.query.chainId)
  const [members, setMembers] = useState()
  const { data: balance } = useBalance({
    addressOrName: daoAddress,
    chainId: daoChain,
    watch: true,
  })

  useEffect(() => {
    const fetchMembers = async () => {
      const result = await getMembers(Number(daoChain), daoAddress)
      console.log('member data', result?.data?.daos?.[0]?.members)
      setMembers(result?.data?.daos?.[0]?.members)
    }

    fetchMembers()
  }, [])

  return (
    <Info heading="About">
      <Flex dir="row" align="separate" gap="md">
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/treasury',
            query: {
              dao: router.query.dao,
              chainId: router.query.chainId,
            },
          }}
          passHref
        >
          <Flex
            dir="col"
            align="start"
            gap="sm"
            css={{
              '&:hover': {
                borderBottom: '1px solid $accent',
              },
            }}
          >
            <Text
              color="accent"
              css={{
                display: 'flex',
                gap: '5px',
              }}
            >
              {balance && ethers.utils.formatUnits(balance.value, balance.decimals)}
              {ethers.constants.EtherSymbol}
            </Text>
            <Text>Balance</Text>
          </Flex>
        </Link>
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/members',
            query: {
              dao: router.query.dao,
              chainId: router.query.chainId,
            },
          }}
          passHref
        >
          <Flex
            dir="col"
            align="start"
            gap="sm"
            css={{
              '&:hover': {
                borderBottom: '1px solid $accent',
              },
            }}
          >
            <Text color="accent">{members?.length}</Text>
            <Text>Members</Text>
          </Flex>
        </Link>
      </Flex>
      <Flex align="center">
        <Dialog>
          <DialogTrigger>
            <Button
              variant="brutal"
              css={{
                position: 'relative',
                bottom: '0',
                right: '0',
                left: '0',
                width: '5rem',
                margin: '1rem',
              }}
            >
              JOIN
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NewProposalModal proposalProp="tribute" />
          </DialogContent>
        </Dialog>
      </Flex>
    </Info>
  )
}
