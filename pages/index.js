import React from 'react'
import { Product,FooterBanner,HeroBanner } from '../components/index'
import {client} from "../lib/client"

const Home = ({products,banner}) => {
         console.log(banner.length&&banner[0])
  return (
    <>
        <HeroBanner heroBanner={banner.length&&banner[0]}/>

        <div className="products-heading">
                <h2>Beset Selling Products</h2>
                <p>Speakers of many types</p>
        </div>

        <div className="products-container">
                {
                        products?.map((product)=>( <div> {product.name} </div>  )      )
                }
        </div>

        Footer
    </>
  )
}

export const getServerSideProps=async ({})=>{
                const productQuery='*[_type == "product"]'
                const products= await client.fetch(productQuery)

                const bannerQuery='*[_type == "banner"]'
                const banner= await client.fetch(bannerQuery)

                return {props:{products,banner}}
}


export default Home