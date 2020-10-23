/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { initializeApollo } from '../lib/ApolloClient'
import { useQuery } from '@apollo/react-hooks'
import ReactLoading from 'react-loading'
import Masonry from 'react-masonry-css'

import POSTS_QUERY from '../queries/posts'
import CachedNum_QUERY from '../queries/cached-num'

import Post from './Post'

const Posts = (props) => {
  const apolloClient = initializeApollo()
  const loadNum = 15
  const [endCursor, setEndCursor] = useState('')
  const [postsArray, setPostsArray] = useState([])
  const [initialLoad, setInitialLoad] = useState(false)
  const [skipStatus, setSkipStatus] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [breakPointCols, setBreakPointCols] = useState('')
  const { loading, error, data } = useQuery(
    POSTS_QUERY,
    {
      variables: {
        id: loadNum,
        endCursor: endCursor
      },
      skip: skipStatus
      // fetchPolicy: "cache-and-network"
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
    setTimeout(() => {
      try {
        const cachedLoadNum = apolloClient.readQuery({ query: CachedNum_QUERY })
        // setLoadNum(cachedLoadNum.loadNum)
      } catch (e) {
        // setLoadNum(15)
      }
      setSkipStatus(false)
    }, 100)
  }, [])

  useEffect(() => {
    const onCompleted = (data) => {
      if (data && data.posts) {
        const fetchData = data.posts.nodes
        setPostsArray([...postsArray, ...fetchData])
        setInitialLoad(true)

        if (!data.posts.pageInfo.hasNextPage) {
          setHasNextPage(false)
        }
        apolloClient.writeQuery({
          query: CachedNum_QUERY,
          data: {
            loadNum
          }
        })
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
    setEndCursor(data.posts.pageInfo.endCursor)
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap">
          Oops, there was an error :( Please try again later.
        </div>
      </div>
    )
  }
  return (
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
  )
}

export default Posts
