import Head from 'next/head'
import React from 'react'
import Breadcrumbs from '../components/Breadcrums'

const Shipping = () => {
  return (
    <div>
                <Head>
                        <title>Shipping | Glams Haven</title>       
                </Head>
                <Breadcrumbs activeStep={1}/>
    </div>
  )
}

export default Shipping