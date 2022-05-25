import React from 'react'
import { styled } from '../../styles/stitches.config'
import { Button, Flex, Text } from '../../styles/elements';
import { Dialog, DialogTrigger, DialogContent } from '../../styles/Dialog';
import { NewProposalModal } from './newproposal';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Profile = styled(Flex, {
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '1.5rem',
    flexDirection: 'column',
    color: '$foreground',
    maxHeight: '25vh',
    minWidth: '300px',
    padding: '2rem',
    border: '1px solid $gray800'
});

export default function ProfileComponent({ dao }) {
  const router = useRouter();
  const daoAddress = router.query.dao

  return (
    <Profile>
            <Text size="lg">About</Text>
            <Flex dir="row" align="separate" gap="md">
                <Flex dir="col" align="start" gap="sm">
                    <Text color="accent">123</Text>
                    <Text>Balance</Text>
                </Flex>
                <Flex dir="col" align="center" gap="sm" >
                    <Link 
                        href={{
                                pathname: '[dao]/members',
                                query: { dao: daoAddress}
                        }}>
                        <Flex dir="col" align="start" gap="sm">
                            <Text color="accent">{111}</Text>
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
    </Profile>
  )
}
