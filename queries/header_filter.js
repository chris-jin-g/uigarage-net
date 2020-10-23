/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const COLOR_PLATFORM_QUERY = gql`
    query {
        colors (first: 100) {
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
        platforms (first: 100) {
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

export default COLOR_PLATFORM_QUERY
