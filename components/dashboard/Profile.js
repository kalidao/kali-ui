import React from 'react'
import { styled } from '../../styles/stitches.config'
import { Button, Flex, Text } from '../../styles/elements';
import { ethers } from 'ethers';
import { Dialog, DialogTrigger, DialogContent } from '../../styles/Dialog';
import { NewProposalModal } from '../newproposal';
import { proposals } from '../newproposal/proposals';
import Link from 'next/link';
import { PersonIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { bounce } from '../../styles/animation';
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

  return (
    <Profile>
            <Text size="lg">About</Text>
            <Flex dir="row" align="separate" gap="md">
                <Flex dir="col" align="start" gap="sm">
                    <Text color="accent">123</Text>
                    <Text>Balance</Text>
                </Flex>
                <Flex dir="col" align="center" gap="sm" >
                    <Link href={`${dao ? dao["address"] : null}/members`}>
                        <Flex dir="col" align="start" gap="sm">
                            <Text color="accent">{dao && dao["members"].length}</Text>
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
                    <NewProposalModal showMenu={false} proposal={"giveTribute"} />
                </DialogContent>
            </Dialog>     
    </Profile>
  )
}
