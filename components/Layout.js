/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props
  return (
    <div>
      <Head>
        <title>UIGarage</title>
      </Head>
      <Header />
      { children }
      <Footer />
    </div>
  )
}

export default Layout
