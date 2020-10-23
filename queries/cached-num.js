import gql from 'graphql-tag'

const CACHEDNUM_QUERY = gql`
  query CachedNum {
    loadNum
  }
`

export default CACHEDNUM_QUERY
