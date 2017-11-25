import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

/** Returns GraphQL endpoint URL. Server URL must be absolute */
function getUri() {
  if (process.browser) {
    return `${window.location.origin}/graphql`;
  }
  return 'http://localhost:3000/graphql/';
}

function create (initialState, { getCookie }) {
  const httpLink = new HttpLink({
    uri: getUri(),
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    const cookie = getCookie();
    return {
      headers: {
        ...headers,
        cookie,
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo (initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
