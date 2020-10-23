/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import FILTER_QUERY from '../queries/filter'

const MySelect = dynamic(
  () => import('react-select'),
  { ssr: false }
)

const Filter = (props) => {
  const router = useRouter()
  const [categories, setCategories] = useState()
  const [postFormats, setPostFormats] = useState()
  const [defaultCategoryVal, setDefaultCategoryVal] = useState('')
  const [defaultPostFormatVal, setDefaultPostFormatVal] = useState('')

  const { loading, error, data } = useQuery(
    FILTER_QUERY
  )

  useEffect(() => {
    if (props.categoryInfo && props.categoryInfo.category) {
      const categoryObj = props.categoryInfo.category
      const categoryVal = { value: { uri: categoryObj.uri, id: categoryObj.id }, label: `${categoryObj.name} (${categoryObj.count})` }
      setDefaultCategoryVal(categoryVal)
    }
    if (props.postFormatInfo && props.postFormatInfo.postFormat) {
      const postFormatObj = props.postFormatInfo.postFormat
      const postFormatVal = { value: { uri: postFormatObj.uri, id: postFormatObj.id }, label: `${postFormatObj.name} (${postFormatObj.count})` }
      setDefaultPostFormatVal(postFormatVal)
    }
  }, [props])

  useEffect(() => {
    const onCompleted = (data) => {
      if (data && data.categories && data.postFormats) {
        const categories_option = [{ value: { uri: '/', id: '' }, label: 'All categories' }]
        const postFormats_option = [{ value: { uri: '/', id: '' }, label: 'All postFormats' }]
        data.categories.nodes.map((category) => {
          categories_option.push({ value: { uri: category.uri, id: '' }, label: `${category.name}  (${category.count})` })
        })
        data.postFormats.nodes.map((postFormat) => {
          postFormats_option.push({ value: { uri: postFormat.uri, id: '' }, label: `${postFormat.name} (${postFormat.count})` })
        })
        setCategories(categories_option)
        setPostFormats(postFormats_option)
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

  const handleChange = (selectedOption) => {
    router.push(`${selectedOption.value.uri}${selectedOption.value.id}`)
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-wrap mb-4">
        <div className="w-1/2 md:w-1/4 lg:w-1/4 fl-item px-3">
          <span className="text-base">Select Categories</span>
          <MySelect options={categories} className="mt-1" onChange={handleChange} placeholder="All categories" value={defaultCategoryVal} />
        </div>
        <div className="w-1/2 md:w-1/4 lg:w-1/4 fl-item px-3">
          <span className="text-base">Posts Format</span>
          <MySelect options={postFormats} className="mt-1" onChange={handleChange} placeholder="All postFormats" value={defaultPostFormatVal} />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

Filter.propTypes = {
  categoryInfo: PropTypes.object,
  postFormatInfo: PropTypes.object
}
export default Filter
