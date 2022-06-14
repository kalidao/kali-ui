import React from 'react'
import { Flex } from '../../../../styles/elements'
import Link from 'next/link'
import { styled } from '../../../../styles/stitches.config'
import { bounce } from '../../../../styles/animation'
import { useRouter } from 'next/router'
import { CHECK_APPS } from '../../../../graph'
import { RiInformationFill, RiInformationLine } from 'react-icons/ri'
import { BsFillPiggyBankFill, BsPiggyBank, BsPeople, BsFillPeopleFill, BsPiggyBankFill } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { GiCoins, GiBriefcase } from 'react-icons/gi'
import { HiHome, HiOutlineHome } from 'react-icons/hi'

const Icon = styled('span', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$background',
  maxWidth: '2rem',
  borderRadius: '100%',

  '& svg': {
    color: `$gray100`,
    '&:hover': {
      color: `$gray300`,
    },
  },
})

export default function Menu() {
  const router = useRouter()
  const path = router.pathname

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
      <Icon>
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
          {path.includes('treasury') || path.includes('members', 'info') || path.includes('info') ? (
            <HiOutlineHome size={30} />
          ) : (
            <HiHome size={30} />
          )}
        </Link>
      </Icon>
      <Icon>
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/treasury',
            query: {
              chainId: router.query.chainId,
              dao: router.query.dao,
            },
          }}
          passHref
        >
          {path.includes('treasury') ? <BsFillPiggyBankFill size={30} /> : <BsPiggyBank size={30} />}
        </Link>
      </Icon>

      <Icon>
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/members',
            query: {
              chainId: router.query.chainId,
              dao: router.query.dao,
            },
          }}
          passHref
        >
          {path.includes('members') ? <BsFillPeopleFill size={30} /> : <BsPeople size={30} />}
        </Link>
      </Icon>

      <Icon>
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/crowdsale',
            query: {
              chainId: router.query.chainId,
              dao: router.query.dao,
            },
          }}
        >
          <Icon as="a">
            <GiCoins size={30} />
          </Icon>
        </Link>
      </Icon>

      <Icon>
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/crowdsale',
            query: {
              chainId: router.query.chainId,
              dao: router.query.dao,
            },
          }}
        >
          <Icon as="a">
            <GiBriefcase size={30} />
          </Icon>
        </Link>
      </Icon>

      {/* {data != undefined
        ? data['daos'][0]['crowdsale'] != null && (
            <Link
              href={{
                pathname: '/daos/[chainId]/[dao]/crowdsale',
                query: {
                  chainId: router.query.chainId,
                  dao: router.query.dao,
                },
              }}
            >
              <Icon as="a">
                <GiCoins size={30} />
              </Icon>
            </Link>
          )
        : null} */}

      <Icon as="a">
        <Link
          href={{
            pathname: '/daos/[chainId]/[dao]/info',
            query: {
              chainId: router.query.chainId,
              dao: router.query.dao,
            },
          }}
          passHref
        >
          {path.includes('info') ? <RiInformationFill size={30} /> : <RiInformationLine size={30} />}
        </Link>
      </Icon>
    </Flex>
  )
}
