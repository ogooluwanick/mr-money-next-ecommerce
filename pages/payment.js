import Head from 'next/head'
import React from 'react'
import Breadcrumbs from '../components/Breadcrums'

const Payment = () => {
  return (
    <div>
                <Head>
                                <title>Shipping | Glams Haven</title>       
                </Head>
                <Breadcrumbs activeStep={2}/>
    </div>
  )
}

export default Payment