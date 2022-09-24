import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Layout from '@components/layout'
import { useRouter } from 'next/router'
import { useGetDaos } from '@graph/queries/getDaos'
import { useNetwork } from 'wagmi'
import { Box, Button, IconArrowUp, IconSearch, Input, Skeleton } from '@kalidao/reality'
import DaoCard from '@components/home/DaoCard'
import Search from '@components/home/Search'

const ExplorePage: NextPage = () => {
    const router = useRouter()
    const { chain: activeChain } = useNetwork()
    const [chain, setChain] = useState(activeChain ? activeChain.id : 1)
    const { data, isLoading, error } = useGetDaos(chain)
    const [display, setDisplay] = useState(data?.data?.daos)
    useEffect(() => {
        router.prefetch('/')
    })

    useEffect(() => {
        router.prefetch('/create')
    })

    console.table(data?.data?.daos)

    return (<Layout heading={'Explore'} content="Create a Kali DAO.">
        <Box position="relative" top="10" display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" height="10" gap="3" width="viewWidth" paddingX="3">
            <Box width="viewWidth" display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" paddingX="10" >
                <Button variant="transparent" shape="circle" as="a" href="/"><IconArrowUp /></Button>
                <Search daos={data?.data} setDisplay={setDisplay} />
            </Box>
            <Skeleton>
                <Box position="absolute" display="flex" alignItems="flex-end" justifyContent="flex-start" gap="2" width="viewWidth" flexWrap="wrap">
                    {data && !error && display.map((dao: { [x: string]: any }) => <DaoCard key={dao['id']} dao={dao} chain={chain} />)}
                </Box>
            </Skeleton>
        </Box >
    </Layout >
    )
}

export default ExplorePage