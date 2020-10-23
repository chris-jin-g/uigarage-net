/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Post = props => {
  // eslint-disable-next-line react/prop-types
  const { post } = props
  const [isAfterLoad, setAfterLoad] = useState(false)
  // eslint-disable-next-line react/react-in-jsx-scope
  const placeholder = (<div className="photo-placeholder"></div>)
  const afterLazyLoad = () => {
    setAfterLoad(true)
  }

  return undefined !== post ? (
    <div key={post.postId}>
      <Link
        as={`/post/${post.slug}`}
        href={`/post?slug=${post.slug}`}
      >
        <a className="block mb-2">
          <LazyLoadImage
            alt={post.title}
            src={post.featuredImage ? post.featuredImage.node.sourceUrl : ''}
            delayTime={700}
            effect="blur"
            afterLoad={afterLazyLoad}
            placeholder={placeholder}
          />
        </a>
      </Link>

      {isAfterLoad ? (
        <Link
          as={`/post/${post.slug}-${post.postId}`}
          href={`/post?slug=${post.slug}-${post.postId}`}
        >
          <a className="text-base font-bold text-grey-400 hover:text-ui-dark">{post.title}</a>
        </Link>
      ) : ''
      }
    </div>
  ) : (
    ''
  )
}

export default Post
