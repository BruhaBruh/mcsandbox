import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  getMainDefinition,
  relayStylePagination,
} from "@apollo/client/utilities";
import { useMemo } from "react";
import merge from "ts-deepmerge";
import isEqual from "../helpers/isEqual";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_HTTP, // Server URL (must be absolute)
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: process.browser
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          new WebSocketLink({
            // if you instantiate in the server, the error will be thrown
            uri: "ws://localhost/graphql",
            options: {
              reconnect: true,
            },
          }),
          httpLink
        )
      : httpLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            users: relayStylePagination(),
            products: relayStylePagination(),
            orders: relayStylePagination(),
            executors: relayStylePagination(),
            orderchats: relayStylePagination(),
            ordermessages: relayStylePagination(),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any, sourceArray: any) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const client = useMemo(() => initializeApollo(initialState), [initialState]);
  return client;
}
