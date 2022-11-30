import { addresses } from "@constants/addresses"
import { getProvider } from "@utils/getProvider"
import { Contract } from "ethers"
import SWAP_ABI from "@abi/KaliDAOcrowdsaleV2.json"

export const getSwapSales = async (dao: string, chainId: number) => {
    try {
        console.log(dao, chainId, addresses[chainId]['extensions']['crowdsale2'])
        const provider = getProvider(chainId)
        const contract = new Contract(addresses[chainId]["extensions"]["crowdsale2"], SWAP_ABI, provider)
        const events = await contract.queryFilter('ExtensionCalled')
        return events
    } catch (e) {
        console.log(e)
    }
}