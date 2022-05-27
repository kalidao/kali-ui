import React from 'react'
import { Flex } from '../../../../styles/elements'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from '../../../../styles/stitches.config'
import { bounce } from '../../../../styles/animation'
import { useRouter } from 'next/router'
import { getDaoChain } from '../../../../utils'
import { CHECK_APPS } from '../../../../graph'
import { useQuery } from '@apollo/client'
import { BsPiggyBank, BsFillPeopleFill } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { GiCoins } from "react-icons/gi";

const Icon = styled('span', {
    display: 'flex', 
    alignItems: 'center', 
    
    '&:hover': {
        animation: `${bounce} 0.5s infinite`
    }
});

export default function Menu() {
  const router = useRouter();
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { loading, error, data } = useQuery(CHECK_APPS, {
    variables: { dao: daoAddress },
    // client: new ApolloClient({
    //   uri: GRAPH_URL[daoChain],
    //   cache: new InMemoryCache()
    // })
  });

  console.log('data', data)

  return (
    <Flex css={{
        position: 'fixed',
        top: '7rem',
        bottom: '0',
        left: '1rem',
        right: '0',
        flexDirection: 'column',
        gap: '2rem'
    }}>
        <Link href={{
            pathname: '/daos/[chainId]/[dao]/',
            query: { 
                chainId: router.query.chainId,
                dao: router.query.dao,
            }
        }}
        >
            <Icon>
                <GoHome size={30} />
            </Icon>
        </Link>
        <Link href={{
            pathname: '/daos/[chainId]/[dao]/treasury',
            query: { 
                chainId: router.query.chainId,
                dao: router.query.dao,
            }
        }}>
            <Icon>
                <BsPiggyBank size={30}/>
            </Icon>
        </Link>
        <Link href={{
            pathname: '/daos/[chainId]/[dao]/info',
            query: { 
                chainId: router.query.chainId,
                dao: router.query.dao,
            }
        }}>
            <Icon as="a">
                <HiOutlineInformationCircle size={30}/>
            </Icon>   
        </Link>
        <Link href={{
            pathname: '/daos/[chainId]/[dao]/members',
            query: { 
                chainId: router.query.chainId,
                dao: router.query.dao,
            }
        }}>
            <Icon>
                <BsFillPeopleFill size={30} />
            </Icon>   
        </Link>
        {(data && data["daos"][0]["crowdsale"] != null) ?
        <Link href={{
            pathname: '/daos/[chainId]/[dao]/crowdsale',
            query: { 
                chainId: router.query.chainId,
                dao: router.query.dao,
            }
        }}>
            <Icon as="a">
                <GiCoins size={30} />
            </Icon>   
        </Link> : null}
    </Flex>
  )
}
