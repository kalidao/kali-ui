import { Card, Heading, Spinner, Stack, Stat } from "@kalidao/reality"
import { useRouter } from "next/router"
import { useQuery } from "wagmi";
import { getDaoInfo } from "@graph/queries";
import { ethers } from "ethers";
import { formatVotingPeriod } from "@utils/votingPeriod";

const Profile = () => {
    const router = useRouter()
    const { chainId, dao } = router.query;
    const { data, isLoading, isError, error } = useQuery(['daoProfileInfo', chainId, dao], () => getDaoInfo(chainId, dao), {
        enabled: !!chainId && !!dao,
    })
    const info = data?.data?.daos?.[0]

    if (isLoading) return <Spinner />
    
    console.log('profile', data?.data?.daos?.[0]?.token?.name)
    return <Card padding="6">
        {isLoading ? <Spinner /> : <Stack>
        <Heading>{info?.token?.name} ({info?.token?.symbol})</Heading>
        <Stack direction={"horizontal"}>
            <Stat label="Total Supply" value={info ? ethers.utils.formatEther(info?.token?.totalSupply) : null} />
            <Stat label="Voting Period" value={formatVotingPeriod(info?.votingPeriod)} />
            </Stack>
            </Stack>}
          
    </Card>
}

export default Profile