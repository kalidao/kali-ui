import React from 'react'
import { styled } from '../../../styles/stitches.config'
import { Button, Flex, Text } from '../../../styles/elements';
import { Dialog, DialogTrigger, DialogContent } from  '../../../styles/Dialog';
import { NewProposalModal } from '../newproposal/';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DAO_MEMBERS } from '../../../graph';
import { useQuery } from '@apollo/client';
import { getDaoChain } from '../../../utils';
import { useBalance } from 'wagmi';
import { ethers } from 'ethers';

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
  const daoChain = getDaoChain(daoAddress)
  const { data: balance, isError, isLoading } = useBalance({
    addressOrName: daoAddress,
    chainId: daoChain, 
    watch: true
  })
  const { loading, error, data } = useQuery(DAO_MEMBERS, {
    variables: { dao: daoAddress },
    // client: new ApolloClient({
    //   uri: GRAPH_URL[daoChain],
    //   cache: new InMemoryCache()
    // })
  });

  const members = data && data['daos'][0]["members"].length

  console.log(error, data, members)

  return (
    <Box>
            <Text size="lg">About</Text>
            <Flex dir="row" align="separate" gap="md">
                <Flex dir="col" align="start" gap="sm">
                    <Text color="accent">{(ethers.utils.formatUnits(balance.value, balance.decimals))}</Text>
                    <Text>Balance</Text>
                </Flex>
                <Flex dir="col" align="center" gap="sm" >
                    <Link 
                        href={{
                                pathname: '/daos/[dao]/members',
                                query: { dao: daoAddress}
                        }}>
                        <Flex dir="col" align="start" gap="sm">
                            <Text color="accent">{members}</Text>
                            <Text>
                                Members
                            </Text>
                        </Flex>
                    </Link>
                </Flex>
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
