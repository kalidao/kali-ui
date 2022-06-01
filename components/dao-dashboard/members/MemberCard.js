import { ethers } from "ethers";
import { useEnsName } from "wagmi";
import { Flex, Text } from "../../../styles/elements";
import { truncateAddress } from "../../../utils/formatters";
import { Spinner } from "../../elements";

export default function MemberCard({ member, totalSupply }) {
    const { data, isLoading } = useEnsName({
      address: member.address,
      chainId: 1
    })

    // TODO: 
    //  - Add profile image
    return <Flex dir="row" align="separate" css={{ background: "$background", padding: '1rem', gap: '1rem'}}>
      {isLoading ? <Spinner /> : <>
        <Text color="foreground" css={{
          maxWidth: '15px'
        }}>{data ? data : truncateAddress(member.address)}</Text>
        <Text color="foreground">{Number(ethers.utils.formatUnits(member.shares, 18))}</Text>
        <Text color="foreground">
          {((member.shares / totalSupply) * 100).toPrecision(2)}
        </Text>
      </>}
    </Flex>
  }