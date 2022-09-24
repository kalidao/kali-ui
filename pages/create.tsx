import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import { Box, Button } from '@kalidao/reality'
import DeployDaoWrapper from '@components/deploy-dao'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

const CreatePage: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        router.prefetch('/')
    })

    return (<Layout heading="Create" content="Create a Kali DAO.">
        <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" height="10" gap="3" width="viewWidth">
            <Button variant="transparent" as="a" href="/"><ArrowLeftIcon /></Button>
            <Box width="viewWidth">
                <DeployDaoWrapper />
            </Box>
        </Box>
    </Layout>
    )
}

export default CreatePage