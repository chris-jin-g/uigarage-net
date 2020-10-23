/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const PLATFORM_QUERY = gql`
	query platform ($id: ID!, $endCursor: String, $count: Int) {
		platform(id: $id, idType: NAME) {
			id
			link
			name
			slug
			uri
			count
			posts (first: $count, after: $endCursor) {
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
				pageInfo {
					endCursor
					hasNextPage
					hasPreviousPage
					startCursor
				}
			}
		}
	}
`

export default PLATFORM_QUERY
