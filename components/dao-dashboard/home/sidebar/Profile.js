import React, { useState, useEffect } from 'react'
import { Button, Flex, Box, Text } from '../../../../styles/elements'
import { Dialog, DialogTrigger, DialogContent } from '../../../../styles/Dialog'
import { NewProposalModal } from '../../newproposal/'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useBalance, useAccount, useContractRead } from 'wagmi'
import { ethers } from 'ethers'
import Info from '../../../../styles/Info'
import { getMembers } from '../../../../graph/queries'
import { getRandomEmoji } from '../../../../utils'

import { addresses } from '../../../../constants/addresses'
import REDEMPTION_ABI from '../../../../abi/KaliDAOredemption.json'

export default function ProfileComponent({ dao }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = Number(router.query.chainId)
  const [members, setMembers] = useState()
  const [isMember, setIsMember] = useState(false)

  const { data: user } = useAccount()
  const { data: balance } = useBalance({
    addressOrName: daoAddress,
    chainId: daoChain,
    watch: true,
  })
  console.log({ daoChain })
  const redemptionAddress = daoChain && addresses[daoChain] ? addresses[daoChain]['extensions']['redemption'] : undefined
  const { data: redemption, isLoading: isRedemptionLoading } = useContractRead({
    addressOrName: redemptionAddress,
    contractInterface: REDEMPTION_ABI,
    functionName: 'redemptionStarts',
    args: daoAddress,
    chainId: Number(daoChain),
  })

  useEffect(() => {
    let mounted = true
    const fetchMembers = async () => {
      const result = await getMembers(Number(daoChain), daoAddress)
      setMembers(result?.data?.daos?.[0])
    }

    fetchMembers()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (members?.members) {
      for (let i = 0; i < members?.members.length; i++) {
        if (members?.members[i].address.toLowerCase() === user?.address.toLowerCase()) {
          setIsMember(true)
          console.log('member found')
        }
      }
    } else {
      setIsMember(false)
      console.log('members not found')
    }
  }, [user, members])

  return (
    <Info heading="About">
      <Flex
        dir="col"
        gap="md"
        align="center"
        css={{
          fontFamily: 'Regular',
          color: '$gray12',
        }}
      >
        <Box
          css={{
            background: '$gray9',
            borderRadius: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '55px',
            width: '55px',
            fontSize: '24px',
          }}
        >
          {members && getRandomEmoji(members?.['id'])}
        </Box>
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
              <Text color="accent">
                {balance && Number(ethers.utils.formatUnits(balance.value, balance.decimals)).toFixed(2)}
                {'   '}
                {ethers.constants.EtherSymbol}
              </Text>
              <Text
                css={{
                  color: '$gray11',
                }}
              >
                Balance
              </Text>
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
              <Text color="accent">{members?.members.length}</Text>
              <Text
                css={{
                  color: '$gray11',
                }}
              >
                Members
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>
      <Flex align="center">
        {/* TODO: Add check for whether redemption has started */}
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
              {isMember ? (!isRedemptionLoading ? (redemption == 0 ? 'JOINED' : 'QUIT') : null) : 'JOIN'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            {isMember ? (
              !isRedemptionLoading ? (
                redemption == 0 ? (
                  <NewProposalModal proposalProp="tribute" />
                ) : (
                  <NewProposalModal proposalProp="quit" />
                )
              ) : null
            ) : (
              <NewProposalModal proposalProp="tribute" />
            )}
          </DialogContent>
        </Dialog>
      </Flex>
    </Info>
  )
}
