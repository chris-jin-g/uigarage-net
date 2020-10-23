/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const POST_BY_ID_QUERY = gql`
  query Post($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      postId
      title
      slug
      date
    	categories {
      	nodes {
          name
        }
    	}
      featuredImage {
        node {
          id
          uri
          title
          srcSet
          sourceUrl
        }
      }
    }
  }
`

export default POST_BY_ID_QUERY
