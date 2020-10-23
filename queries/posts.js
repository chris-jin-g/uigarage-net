import gql from 'graphql-tag'

const POSTS_QUERY = gql`
  query Posts($id: Int, $endCursor: String) {
    posts(first: $id, after: $endCursor) {
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

export default POSTS_QUERY
