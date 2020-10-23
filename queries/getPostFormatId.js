/* eslint-disable no-tabs */
import gql from 'graphql-tag'

const GETPOSTFORMATID_QUERY = gql`
	query($name:String) {
		postFormats(where: {search: $name}) {
			nodes {
				id
				link
				name
				slug
				uri
				count      
			}
		}
	}
`

export default GETPOSTFORMATID_QUERY
