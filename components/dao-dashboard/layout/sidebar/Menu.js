import React from 'react'
import { Flex } from '../../../../styles/elements'
import Link from 'next/link'
import { styled } from '../../../../styles/stitches.config'
import { bounce } from '../../../../styles/animation'
import { useRouter } from 'next/router'
import { CHECK_APPS } from '../../../../graph'
import { RiInformationFill, RiInformationLine } from 'react-icons/ri'
import {
  BsFillPiggyBankFill,
  BsPiggyBank,
  BsPeople,
  BsFillPeopleFill,
  BsBriefcase,
  BsBriefcaseFill,
} from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { GiCoins, GiBriefcase } from 'react-icons/gi'
import { HiHome, HiOutlineHome } from 'react-icons/hi'
import { useContractRead } from 'wagmi'
import { addresses } from '../../../../constants/addresses'
import CROWDSALE_ABI from '../../../../abi/KaliDAOcrowdsaleV2.json'

const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '25px',
  fontFamily: 'Regular',
  color: '$gray11',
  maxWidth: '7rem',
  padding: '2px 10px',
  borderRadius: '20px',
  lineHeight: 1,
  border: '1px solid $gray3',
  background: '$gray2',
  zIndex: '10',

  '&:hover': {
    background: '$gray3',
    color: '$gray12',
  },
})

const Icon = styled('span', {
  display: 'flex',
  justifyContent: 'center',
  padding: '6px',
  alignItems: 'center',
  background: '$background',
  borderRadius: '100%',
  height: '20px',
  width: '20px',

  '& svg': {
    color: `$gray11`,
    '&:hover': {
      color: `$gray12`,
    },
    '&:active': {
      color: `$gray12`,
    },
  },
})

export default function Menu() {
  const router = useRouter()
  const path = router.pathname
  const { dao, chainId } = router.query

  const { data: saleActive, error } = useContractRead(
    {
      addressOrName: addresses[chainId]['extensions']['crowdsale2'],
      contractInterface: CROWDSALE_ABI,
    },
    'crowdsales',
    {
      chainId: Number(chainId),
      args: [dao],
    },
  )

  console.log('saleActive', saleActive)

  return (
    <Flex
      css={{
        position: 'fixed',
        top: '7rem',
        bottom: '0',
        left: '1rem',
        right: '0',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <Link
        href={{
          pathname: '/daos/[chainId]/[dao]/',
          query: {
            chainId: router.query.chainId,
            dao: router.query.dao,
          },
        }}
        passHref
      >
        <Item>
          <Icon>
            {path.includes('treasury') || path.includes('members', 'info') || path.includes('info') ? (
              <HiOutlineHome size={30} />
            ) : (
              <HiHome size={30} />
            )}
          </Icon>
          Home
        </Item>
      </Link>
      <Link
        href={{
          pathname: '/daos/[chainId]/[dao]/treasury',
          query: {
            chainId: chainId,
            dao: dao,
          },
        }}
        passHref
      >
        <Item>
          <Icon>{path.includes('treasury') ? <BsFillPiggyBankFill size={30} /> : <BsPiggyBank size={30} />}</Icon>
          Treasury
        </Item>
      </Link>
      <Link
        href={{
          pathname: '/daos/[chainId]/[dao]/members',
          query: {
            chainId: chainId,
            dao: dao,
          },
        }}
        passHref
      >
        <Item>
          <Icon>{path.includes('members') ? <BsFillPeopleFill size={30} /> : <BsPeople size={30} />}</Icon>
          Members
        </Item>
      </Link>
      {saleActive?.['saleEnds'] != 0 && (
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/crowdsale',
            query: {
              chainId: chainId,
              dao: dao,
            },
          }}
        >
          <Item>
            <Icon>
              <Icon as="a">
                <GiCoins size={30} />
              </Icon>
            </Icon>
            Crowdsale
          </Item>
        </Link>
      )}
      {/* 
        TODO: 
        - Conditional on whether crowdsale active 
        - Add outline coin stack icon
      */}
      <Link
        href={{
          pathname: '/services',
        }}
        passHref
      >
        <Item>
          <Icon as="a">{path.includes('services') ? <BsBriefcaseFill size={30} /> : <BsBriefcase size={30} />}</Icon>
          Services
        </Item>
      </Link>
      <Link
        href={{
          pathname: '/daos/[chainId]/[dao]/info',
          query: {
            chainId: chainId,
            dao: dao,
          },
        }}
        passHref
      >
        <Item>
          <Icon as="a">
            {path.includes('info') ? <RiInformationFill size={30} /> : <RiInformationLine size={30} />}
          </Icon>
          Learn
        </Item>
      </Link>
    </Flex>
  )
}
