import React, { Children } from 'react'
import Head from "next/head"
import Navbar from './Navbar'
import Footer from './Footer'
import Meta from './Meta'

const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Meta/>
        <header>
                <Navbar/>
        </header>
        <main className="main-container">
                {children}
        </main>
        <footer>
                <Footer/>
        </footer>
    </div>
  )
}

export default Layout