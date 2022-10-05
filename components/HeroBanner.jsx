import React from 'react'
import LINK from "next/link"

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
        <div className="">
                <p className="beats-solo">Small text here</p>
                <h3 className="">MID TEXT</h3>
                <img src="" alt="headphones" className=' hero-banner-image' />

                <div className="">
                        <LINK href="/product/ID">
                                <button type='button'>BUTTON TEXT</button>
                        </LINK>
                        <div className='desc'>
                                <h5 >Description</h5>
                                <p >DESCRIPTION</p>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default HeroBanner