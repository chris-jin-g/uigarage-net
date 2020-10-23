/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const FILTER_QUERY = gql`
    query {
        categories (first: 100) {
            nodes {
                count
                description
                id
                link
                name
                slug
                uri
            }
        }
        postFormats (first: 100) {
            nodes {
                count
                name
                slug
                description
                uri
                id
            }
        }
    }
`

export default FILTER_QUERY
