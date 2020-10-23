import { useMemo } from 'react'
import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { persistCache } from 'apollo-cache-persist'
import clientConfig from '../client-config'

let apolloClient

function createApolloClient () {
  const cache = new InMemoryCache()
  try {
    // See above for additional options, including other storage providers.
    persistCache({
      cache,
      storage: window.localStorage
    })
  } catch (error) {
    // console.error('Error restoring Apollo cache', error)
  }

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: clientConfig.graphqlUrl, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch: fetch
    }),
    cache
  })
}

export function initializeApollo (initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo (initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
