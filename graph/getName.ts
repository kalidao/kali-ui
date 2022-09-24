import { GRAPH_NAME } from "./url"

export const getName = (chainId: number) => {
    return GRAPH_NAME[chainId]
}

