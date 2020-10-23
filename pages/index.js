/* eslint-disable react/react-in-jsx-scope */
import Layout from '../components/Layout'
import Filter from '../components/Filter'
import Posts from '../components/Posts'

const Index = props => {
  // const { posts } = props

  return (
    <Layout>
      <Filter/>
      <Posts/>
    </Layout>
  )
}

export default Index
