import { ethers } from "ethers"
import { Flex, Text } from "../../../../../styles/elements"

export default function Mint({ accounts, amounts }) {
    for (let i=0; i<accounts.length; i++) {
        return <Flex css={{
            fontFamily: 'Regular',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        }}>
            <Text>{accounts[i]}</Text>
            <Text>{ethers.utils.formatEther(amounts[i])}</Text>
        </Flex> 
    }
}