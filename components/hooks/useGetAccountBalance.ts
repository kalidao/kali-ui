import { AnkrProvider } from '@ankr.com/ankr.js';
import { getChainName } from '@utils/chains'
import { useQuery } from '@tanstack/react-query';

export const getAccountBalance = async (chainId: number, address: string) => {
    const chainName = getChainName(chainId);
    const provider = new AnkrProvider(chainName);
    const balance = await provider.getAccountBalance({
        walletAddress: address,
        blockchain: chainName,
    }).catch((err: Error) => {
        console.log(err.message);
    });

    return balance;
}

export const useGetAccountBalance = (chainId: number, address: string) => {
    return useQuery(['balance', chainId, address], () => getAccountBalance(chainId, address), {
        enabled: !!address || !!chainId,
    });
}
