import React, { Children } from 'react'
import Head from "next/head"
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Head>
                <title>Login | Glam's Haven</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
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