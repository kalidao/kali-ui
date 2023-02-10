export const getChainName = (chainId: number): string => {
    switch (chainId) {
        case 1:
            return "eth";
        case 56:
            return "bsc";
        case 137:
            return "polygon";
        case 250:
            return "fantom";
        case 42161:
            return "arbitrum";
        case 43114:
            return "avalanche";
        case 57:
            return "syscoin";
        case 10:
            return "optimism";
        default:
            return "eth";
    }
}