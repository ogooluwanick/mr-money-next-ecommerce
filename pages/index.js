import React from 'react'
import { Product,FooterBanner,HeroBanner } from '../components/index'
import {client} from "../lib/client"
import {default as AllProducts}   from '../models/Product'
import Banner  from '../models/Banner'
import db from "../lib/db"
import MotionWrap from '../components/MotionWrap'
import {  motion} from "framer-motion";


const Home = ({products,banners}) => {
        const stagger = {
                animate: {
                        transition: { staggerChildren: 0.1  }
                }
        };
        
  return (
    <MotionWrap>
        <HeroBanner heroBanner={banners.length?banners[0]:""}/>

        <div className="products-heading">
                <h2>Best Selling Products</h2>
                <p>Speakers of many types</p>
        </div>

        <motion.div className="products-container"  initial='initial' whileInView='animate' exit={{ opacity: 0 }}  variants={stagger}>
                {
                        products?.map((product,index)=> <Product key={product._id} product={product} index={index}/>)
                }
        </motion.div>

        <FooterBanner footerBanner={banners&& banners[1]}/>
    </MotionWrap>
  )
}

export const getServerSideProps=async ({})=>{
                

                await db.connect();
                const products= await AllProducts.find().sort({rating:-1}).limit(5*5).lean();
                const banners= await Banner.find().lean();


                return {props:{  products:products.map(db.convertDocToObj),  banners:banners.map(db.convertDocToObj)  }}
}


export default Home