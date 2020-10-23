/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import HFilter from './Header-Filter'

const Nav = (props) => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line react/prop-types
  const router = useRouter()
  const searchInput = useRef(null)

  const searchKeyPress = (e) => {
    if (e.keyCode === 13) {
      onSearch()
    }
  }
  const onSearch = () => {
    const searchKeyWord = searchInput.current.value
    if (searchKeyWord !== '') {
      router.push(`/search/${searchKeyWord}`)
    }
  }
  return (
    <nav className="relative select-none bg-grey lg:flex lg:items-stretch w-full bg-ui-dark">
      <div className="container mx-auto relative select-none bg-grey lg:flex lg:items-stretch p-4">
        <div className="flex flex-no-shrink items-center mb-6 lg:mb-1 h-8">
          <Link href="/">
            <a className=""><img src="/img/UIGarage-Logo.svg" alt="UIGarage" width="145" height="32" /></a>
          </Link>
          <button className="block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4">
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            {/* <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg> */}
          </button>
        </div>
        <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow ">
          <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
            <Link href="#">
              <div className="flex lg:mr-3 items-center">
                <HFilter />
              </div>
            </Link>
            <Link href="#">
              <div className="flex lg:mr-3 items-center">
                <input type="search" ref={searchInput} onKeyDown={searchKeyPress} className="bg-purple-white shadow rounded border-0 p-3 search-input" placeholder="Search" />
                <div className="absolute pin-r pin-t text-purple-lighter search-icon" onClick={onSearch}>
                  <svg id="search-icon" className="search-icon" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                </div>
              </div>
            </Link>
            <Link href="/categories">
              <a href="#" className="flex-no-grow flex-no-shrink relative py-1 px-4 leading-normal no-underline flex items-center text-grey-500 hover:text-white">Categories</a>
            </Link>
            <Link href="/Profile">
              <a href="#" className="flex-no-grow flex-no-shrink relative py-1 px-4 leading-normal no-underline flex items-center text-grey-500 hover:text-white">My Account</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
