/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const POSTFORMAT_QUERY = gql`
	query PostFormat ($id: ID!, $endCursor: String, $count: Int) {
		postFormat(id: $id) {
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

export default POSTFORMAT_QUERY
