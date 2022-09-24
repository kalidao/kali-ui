import { Resolvers, MeshContext } from '../.graphclient'

export const resolvers: Resolvers = {
    DAO: {
        chainName: (root: any, args: any, context: { chainName: any }, info: any) => context.chainName || 'mainnet', // The value we provide in the config
    },
}