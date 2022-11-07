import { ethers } from "ethers"
import { xdai } from "../constants/chains"

export const getProvider = (chainId: number) => {
    if (chainId == xdai.id) return new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUICKNODE_GNOSIS)
    return new ethers.providers.InfuraProvider(chainId, process.env.NEXT_PUBLIC_INFURA_ID)
}