/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import Router, { withRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import ReactLoading from 'react-loading'
import moment from 'moment'

import Layout from '../../components/Layout'

import POST_BY_ID_QUERY from '../../queries/post-by-id'

// eslint-disable-next-line react/prop-types
function Post ({ router }) {
  const [pid, setPid] = useState()
  const [post, setPost] = useState()
  const [skipStatus, setSkipStatus] = useState(true)

  const { loading, error, data } = useQuery(
    POST_BY_ID_QUERY,
    {
      variables: {
        id: pid
      },
      skip: skipStatus
    }
  )
  useEffect(() => {
    if (router.query && router.query.pid) {
      setPid(router.query.pid)
    }
  })

  useEffect(() => {
    setSkipStatus(false)
  }, [pid])

  useEffect(() => {
    const onCompleted = (data) => {
      if (data && data.post) {
        setPost(data.post)
      }
    }
    const onError = (error) => {
      return <div>{error}</div>
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data)
      } else if (onError && !loading && error) {
        onError(error)
      }
    }
  }, [data])

  return (
    <Layout>
      {post ? (
        <div className="container mx-auto py-8">
          <div className="w-full md:w-1/2 mx-auto">
            <div className="block mb-6">
              <img
                className="w-full m-0"
                src={post.featuredImage ? post.featuredImage.node.sourceUrl : ''}
                alt={post.title}
              />
            </div>
            <div className="description">
              <br></br>
              <h2 className="text-ui-dark"><b>{post.title}</b></h2>
              <h5>Published: {moment(post.date).format('ll')}</h5>
              <br></br>
              <h4><b>Categories:</b>
                {post.categories.nodes.length
                  ? post.categories.nodes.map((category, id) => <a href="#" key={id}>{category.name}</a>)
                  : ''
                }
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="load-initial">
          <ReactLoading
            className="load-icon"
            type="spinningBubbles"
            color="#333333"
            height="60px"
            width="60px"
          />
        </div>
      )}
      <div className="back-btn" onClick={() => Router.back()}>
        <svg id="search-icon" className="back-icon" viewBox="0 0 24 24">
          <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
          c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
          C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
          c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
          C26.18,21.891,26.141,21.891,26.105,21.891z"/>
        </svg>
      </div>
    </Layout>
  )
}

export default withRouter(Post)
