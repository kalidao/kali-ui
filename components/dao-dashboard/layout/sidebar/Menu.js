import React from 'react'
import { Flex } from '../../../../styles/elements'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '../../../../styles/stitches.config'
import { bounce } from '../../../../styles/animation'
import { useRouter } from 'next/router'

const Icon = styled('span', {
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.1rem', 

    '&:hover': {
        animation: `${bounce} 0.5s infinite`
    }
});

export default function Menu() {
  const router = useRouter();
  console.log('query',router.query.dao)
  return (
    <Flex dir="col" gap="md" css={{
        position: 'absolute',
        top: '10rem',
        left: '1rem'
    }}>
        <Link href={{
            pathname: '/daos/[dao]/treasury',
            query: { dao: router.query.dao}
        }}>
            <Icon as="a">
                <Image src={`/icons/money-bag.png`} alt="treasury page link" width='42px' height="42px" />
            </Icon>
        </Link>
        <Link href={{
            pathname: '/daos/[dao]/info',
            query: { dao: router.query.dao}
        }}>
            <Icon as="a">
                <Image src={`/icons/scroll.png`} alt="info page link" width='42px' height="42px" />
            </Icon>   
        </Link>
        <Link href={{
            pathname: '/daos/[dao]/members',
            query: { dao: router.query.dao}
        }}>
            <Icon as="a">
                <Image src={`/icons/person.png`} alt="members page link" width='42px' height="42px" />
            </Icon>   
        </Link>
    </Flex>
  )
}
