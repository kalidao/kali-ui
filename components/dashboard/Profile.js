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
                <Flex dir="col" align="center" gap="sm" >
                    <Link href={`${dao ? dao["address"] : null}/members`}>
                        <Text css={{ display: 'flex', alignItems: 'center', gap: '0.1rem', '&:hover': {
                        color: '$accent'
                    }}}><PersonIcon />Members</Text>
                    </Link>
                    <Text>{dao && dao["members"].length}</Text>
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
            {/* <Flex dir="col" gap="sm">
            <Link href={{
                pathname: '[dao]/treasury',
                query: { dao: router.query.dao}
            }}>
                <Icon>
                    <Image src={`/icons/money-bag.png`} width='30px' height="30px" />
                    <Text>
                        Treasury
                    </Text>
                </Icon>
            </Link>
            <Link href={{
                pathname: '[dao]/info',
                query: { dao: router.query.dao}
            }}>
                <Icon>
                    <Image src={`/icons/scroll.png`} width='30px' height="30px" />
                    <Text>
                        Info
                    </Text>
                </Icon>   
            </Link>
            </Flex> */}
    </Profile>
  )
}
