import { Resolvers } from '../.graphclient'

export const resolvers: Resolvers = {
    Rebase: {
        chainName: (root: any, args: any, context: { chainName: any }, info: any) => context.chainName || 'mainnet', // The value we provide in the config
    },
    Query: {
        crossRebases: async (root: any, args: { chainNames: any[] }, context: { Kali: { Query: { rebases: (arg0: { root: any; args: any; context: any; info: any }) => Promise<any[]> } } }, info: any) =>
            Promise.all(
                args.chainNames.map((chainName: any) =>
                    context.Kali.Query.rebases({
                        root,
                        args,
                        context: {
                            ...context,
                            chainName,
                        },
                        info,
                    }).then((rebases: any[]) =>
                        // We send chainName here so we can take it in the resolver above
                        rebases.map((rebase) => ({
                            ...rebase,
                            chainName,
                        })),
                    ),
                ),
            ).then((allRebases) => allRebases.flat()),
    },
}