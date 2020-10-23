/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import Router, { withRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import ReactLoading from 'react-loading'
import Masonry from 'react-masonry-css'

import Layout from '../../components/Layout'
import Filter from '../../components/Filter'
import Post from '../../components/Post'

import POSTFORMAT_QUERY from '../../queries/postFormat'
import GETPOSTFORMATID_QUERY from '../../queries/getPostFormatId'

// eslint-disable-next-line react/prop-types
function PostFormat ({ router }) {
  const loadNum = 15
  const [endCursor, setEndCursor] = useState('')
  const [postFormatId, setPostFormatId] = useState()
  const [postFormatName, setPostFormatName] = useState()
  const [postsArray, setPostsArray] = useState([])
  const [initialLoad, setInitialLoad] = useState(false)
  const [initialSkipStatus, setInitialSkipStatus] = useState(true)
  const [skipStatus, setSkipStatus] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [breakPointCols, setBreakPointCols] = useState('')

  const { loading: loadingIn, error: errorIn, data: dataIn } = useQuery(
    GETPOSTFORMATID_QUERY,
    {
      variables: {
        name: postFormatName
      },
      skip: initialSkipStatus
    }
  )

  const { loading, error, data } = useQuery(
    POSTFORMAT_QUERY,
    {
      variables: {
        id: postFormatId,
        endCursor: endCursor,
        count: loadNum
      },
      skip: skipStatus
    }
  )

  useEffect(() => {
    window.addEventListener('resize', resizeWindow)
    resizeWindow()
  }, [])

  function resizeWindow () {
    const screenSize = window.innerWidth
    let pointCols = 0
    if (screenSize > 1200) {
      pointCols = 5
    } else if (screenSize < 1200 && screenSize > 992) {
      pointCols = 4
    } else if (screenSize < 992 && screenSize > 768) {
      pointCols = 3
    } else if (screenSize < 768 && screenSize > 576) {
      pointCols = 2
    } else if (screenSize < 576) {
      pointCols = 1
    }
    setBreakPointCols(pointCols)
  }

  useEffect(() => {
    if (router.query && router.query.slug) {
      // setPostFormatId(router.query.slug[1])
      setPostFormatName(router.query.slug[0])
    }
  })

  useEffect(() => {
    setInitialSkipStatus(false)
  }, [postFormatName])

  useEffect(() => {
    setSkipStatus(false)
  }, [postFormatId])

  useEffect(() => {
    const onCompleted = (dataIn) => {
      if (dataIn && dataIn.postFormats) {
        setPostFormatId(dataIn.postFormats.nodes[0].id)
      }
    }
    const onError = (errorIn) => {
      return <div>{errorIn}</div>
    }
    if (onCompleted || onError) {
      if (onCompleted && !loadingIn && !errorIn) {
        onCompleted(dataIn)
      } else if (onError && !loadingIn && errorIn) {
        onError(errorIn)
      }
    }
  }, [dataIn])

  useEffect(() => {
    const onCompleted = (data) => {
      if (data && data.postFormat) {
        const fetchData = data.postFormat.posts.nodes
        setPostsArray([...postsArray, ...fetchData])
        setInitialLoad(true)

        if (!data.postFormat.posts.pageInfo.hasNextPage) {
          setHasNextPage(false)
        }
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

  const handleLoadMore = () => {
    setEndCursor(data.postFormat.posts.pageInfo.endCursor)
  }
  return (
    <Layout>
      <Filter postFormatInfo={data} />
      <div className="container mx-auto py-6">
        {Number.isInteger(breakPointCols) ? (
          <Masonry
            breakpointCols={breakPointCols}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {postsArray.length
              ? postsArray.map((post) => <Post key={`ct-pt-${post.postId}`} post={post} />)
              : ''}
          </Masonry>
        ) : ''}

        {!initialLoad ? (
          <div className="load-initial">
            <ReactLoading
              className="load-icon"
              type="spinningBubbles"
              color="#333333"
              height="60px"
              width="60px"
            />
          </div>
        ) : (
          <div className="load-more flex flex-wrap">
            {loading ? (
              <ReactLoading
                className="load-icon"
                type="spokes"
                color="#333333"
                height="40px"
                width="40px"
              />
            ) : (
              hasNextPage ? (
                <span onClick={() => handleLoadMore()}>Load more...</span>
              )
                : ''
            )}
          </div>
        )}
      </div>
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

export default withRouter(PostFormat)
