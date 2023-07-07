import { AnkrProvider } from '@ankr.com/ankr.js';
import { getChainName } from "@utils/chains";
import { useQuery } from "@tanstack/react-query";

export const getAccountNFT = async (chainId: number, address: string) => {
    const chainName = getChainName(chainId);
    const provider = new AnkrProvider();
    const nft = await provider.getNFTsByOwner({
        walletAddress: address,
        blockchain: chainName,
    }).catch((err: Error) => {
        console.log(err.message);
    });
    
    return nft;
}

export const useGetAccountNFT = (chainId: number, address: string) => {
    return useQuery(['accountNFT', chainId, address], () => getAccountNFT(chainId, address), {
        enabled: !!address || !!chainId,
    });
}