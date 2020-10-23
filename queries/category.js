/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const CATEGORY_QUERY = gql`
	query Category ($id: ID!, $endCursor: String, $count: Int) {
		category(id: $id, idType: SLUG) {
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

export default CATEGORY_QUERY
