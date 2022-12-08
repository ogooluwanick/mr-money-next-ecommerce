import React from 'react'
import LINK from "next/link"

const HeroBanner = ({heroBanner}) => {
  return (
    <div className='hero-banner-container'>
        <div className="">
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3 className="">{heroBanner.midText}</h3>
                <h1 className="">{heroBanner.largeText1}</h1>
                <img src={heroBanner.image} alt={`${heroBanner.SmallText} image`} className=' hero-banner-image' />

                <div className="">
                        <LINK href={`/product/${heroBanner.slug}`}>
                                <button type='button' >{heroBanner.buttonText}</button>
                        </LINK>
                        <div className='desc'>
                                <h5 >Description</h5>
                                <p >{heroBanner.desc}</p>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default HeroBanner