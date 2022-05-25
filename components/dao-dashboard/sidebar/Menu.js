import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '../../../styles/stitches.config'
import { bounce } from '../../../styles/animation'
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

  return (
    <Flex dir="col" gap="md" css={{
        position: 'absolute',
        top: '10rem',
        left: '1rem'
    }}>
        <Link href={{
            pathname: '[dao]/treasury',
            query: { dao: router.query.dao}
        }}>
            <Icon>
                <Image src={`/icons/money-bag.png`} width='42px' height="42px" />
            </Icon>
        </Link>
        <Link href={{
            pathname: '[dao]/info',
            query: { dao: router.query.dao}
        }}>
            <Icon>
                <Image src={`/icons/scroll.png`} width='42px' height="42px" />
            </Icon>   
        </Link>
        <Link href={{
            pathname: '[dao]/members',
            query: { dao: router.query.dao}
        }}>
            <Icon>
                <Image src={`/icons/person.png`} width='42px' height="42px" />
            </Icon>   
        </Link>
        {/* <Image src={`/icons/scroll.png`} width='30px' height="30px" /> */}
    </Flex>
  )
}
