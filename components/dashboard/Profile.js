import React from 'react'
import { styled } from '../../styles/stitches.config'
import { Button, Flex, Text } from '../../styles/elements';
import { ethers } from 'ethers';
import { Dialog, DialogTrigger, DialogContent } from '../../styles/Dialog';
import { NewProposalModal } from '../newproposal';
import { proposals } from '../newproposal/proposals';
import Link from 'next/link';


const Profile = styled(Flex, {
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

  return (
    <Profile>
            <Text size="lg">{dao && dao["token"]["name"]}</Text>
            <Flex dir="row" align="separate" gap="md">
                <Flex dir="col" align="center" gap="sm">
                    <Text>Symbol</Text>
                    <Text>{dao && dao["token"]["symbol"]}</Text>
                </Flex>
                <Flex dir="col" align="center" gap="sm">
                    <Text>Total Supply</Text>
                    <Text>{dao && Math.round(ethers.utils.formatEther(dao["token"]["totalSupply"]))}</Text>
                </Flex>
                <Flex dir="col" align="center" gap="sm">
                    <Link href={`${dao ? dao["address"] : null}/members`}>
                        <Text>Members</Text>
                    </Link>
                    <Text>{dao && dao["members"].length}</Text>
                </Flex>
            </Flex>
            <Dialog>
                <DialogTrigger>
                    <Button>Join</Button>
                </DialogTrigger>
                <DialogContent>
                    <NewProposalModal heading={proposals["tribute"]["call"]["title"]} component={proposals["tribute"]["call"]["component"]} />
                </DialogContent>
            </Dialog>     
    </Profile>
  )
}
