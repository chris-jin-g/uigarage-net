/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useApollo } from '../lib/ApolloClient'
import { ApolloProvider } from 'react-apollo'

import '../styles/main.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
