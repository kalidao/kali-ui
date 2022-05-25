import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPH_URL } from "./url";

export const APOLLO_CLIENT = ({ chainId }) => {
    return new ApolloClient({
        uri: GRAPH_URL[chainId],
        cache: new InMemoryCache()
      });
}