import gql from 'graphql-tag'

const SEARCH_QUERY = gql`
  query Posts($id: Int, $endCursor: String, $searchKey: String) {
    posts(first: $id, after: $endCursor, where: {search: $searchKey}) {
      nodes {
        id
        title
        slug
        date
        postId
        featuredImage {
          node {
            id
            uri
            title
            srcSet
            sourceUrl
          }          
        }
        categories {
          nodes {
            name
          }
        }
      }
      edges {
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`

export default SEARCH_QUERY
