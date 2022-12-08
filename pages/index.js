import React from 'react'
import { Product,FooterBanner,HeroBanner } from '../components/index'
import {client} from "../lib/client"
import {default as AllProducts}   from '../models/Product'
import Banner  from '../models/Banner'
import db from "../lib/db"

const Home = ({products,banners}) => {
        
  return (
    <>
        <HeroBanner heroBanner={banners.length?banners[0]:""}/>

        <div className="products-heading">
                <h2>Best Selling Products</h2>
                <p>Speakers of many types</p>
        </div>

        <div className="products-container">
                {
                        products?.map((product)=> <Product key={product._id} product={product}/>)
                }
        </div>

        <FooterBanner footerBanner={banners&& banners[1]}/>
    </>
  )
}

export const getServerSideProps=async ({})=>{
                

                await db.connect();
                const products= await AllProducts.find().sort({rating:-1}).limit(5*5).lean();
                const banners= await Banner.find().lean();


                return {props:{  products:products.map(db.convertDocToObj),  banners:banners.map(db.convertDocToObj)  }}
}


export default Home