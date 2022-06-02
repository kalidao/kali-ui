import React from 'react'
import { styled } from '../../../../styles/stitches.config'
import { Button, Flex, Text } from '../../../../styles/elements';
import { Dialog, DialogTrigger, DialogContent } from  '../../../../styles/Dialog';
import { NewProposalModal } from '../../newproposal/';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DAO_MEMBERS } from '../../../../graph';
import { useBalance } from 'wagmi';
import { ethers } from 'ethers';
import { useGraph } from '../../../hooks';

export const Box = styled(Flex, {
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1.5rem',
    flexDirection: 'column',
    color: '$foreground',
    maxHeight: '25vh',
    minWidth: '30%',
    padding: '2rem',
    border: '1px solid $gray800',
});

export default function ProfileComponent({ dao }) {
  const router = useRouter();
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data: balance } = useBalance({
    addressOrName: daoAddress,
    chainId: daoChain, 
    watch: true
  })
  const { data, isLoading } = useGraph(daoChain, DAO_MEMBERS, { 
      dao: daoAddress 
    });

  const members = data && data['daos'][0]["members"].length

  console.log('members', members)

  return (
    <Box>
            <Text size="lg">About</Text>
            <Flex dir="row" align="separate" gap="md">
                <Link
                    href={{
                        pathname: '/daos/[chainId]/[dao]/treasury',
                        query: { 
                            dao: router.query.dao,
                            chainId: router.query.chainId
                        }
                }}
                >
                    <Flex dir="col" align="start" gap="sm" css={{
                        '&:hover': {
                            borderBottom: '1px solid $accent'
                        }
                    }}>
                        <Text color="accent">{balance && (ethers.utils.formatUnits(balance.value, balance.decimals))}</Text>
                        <Text>Balance</Text>
                    </Flex>
                </Link>
                    <Link 
                        href={{
                                pathname: '/daos/[chainId]/[dao]/members',
                                query: { 
                                    dao: router.query.dao,
                                    chainId: router.query.chainId
                                }
                        }}>
                        <Flex dir="col" align="start" gap="sm" css={{
                        '&:hover': {
                            borderBottom: '1px solid $accent'
                        }
                    }}>
                            <Text color="accent">{members}</Text>
                            <Text>
                                Members
                            </Text>
                        </Flex>
                    </Link>
            </Flex>
            <Dialog>
                <DialogTrigger>
                    <Button>Join</Button>
                </DialogTrigger>
                <DialogContent>
                    <NewProposalModal proposalProp="giveTribute" />
                </DialogContent>
            </Dialog>     
    </Box>
  )
}
