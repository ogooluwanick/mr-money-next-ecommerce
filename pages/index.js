import React from 'react'
import { Product,FooterBanner,HeroBanner } from '../components/index'

const Home = () => {
  return (
    <>
        <HeroBanner/>

        <div className="products-heading">
                <h2>Beset Selling Products</h2>
                <p>Speakers of many types</p>
        </div>

        <div className="products-container">
                {
                        ["Pro1","Pro2","Pro3","Pro4"].map((product)=>( <div> {product} </div>  )      )
                }
        </div>

        Footer
    </>
  )
}

export default Home