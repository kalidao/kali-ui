import { ethers } from "ethers";
import { useEnsName } from "wagmi";
import { Flex, Text } from "../../../styles/elements";
import { truncateAddress } from "../../../utils/formatters";

export default function MemberCard({ member }) {
    const { data, isLoading } = useEnsName({
      address: member.address
    })

    // TODO: 
    //  - Add profile image
    return <Flex dir="row" align="separate" css={{ background: "$foreground", padding: '1rem', gap: '1rem' }}>
      {isLoading ? <Text>Loading...</Text> : <>
        <Text color="background">{data ? data : truncateAddress(member.address)}</Text>
        <Text color="background">{ethers.utils.formatEther(member.shares)}</Text>
      </>}
    </Flex>
  }