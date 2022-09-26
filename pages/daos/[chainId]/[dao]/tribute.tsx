import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'
import { Heading, Stack, Text, Input } from '@kalidao/reality'

const Tribute: NextPage = () => {
    const router = useRouter()
    const { chainId, dao } = router.query
    const { data } = useContractRead({
        addressOrName: dao as string,
        contractInterface: DAO_ABI,
        functionName: 'name',
        chainId: Number(chainId),
    })

    return (
        <Layout heading={data ? data.toString() : 'Dashboard'} content="Create or vote on a proposal.">
            <Stack>
                <Heading>Make a Tribute</Heading>
                <Input label="Description" />
            </Stack>
        </Layout>
    )
}

export default Tribute
