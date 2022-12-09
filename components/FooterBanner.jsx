import React from 'react'
import LINK from "next/link"

const FooterBanner = ({footerBanner:{name,image,discount,largeText1,largeText2,smallText,midText,desc,saleTime,product,buttonText}}) => {
  return (
    <div className='footer-banner-container'>
        <div className="banner-desc">
                <div className="left">
                        <p>{discount}</p>
                        <h3>{largeText1}</h3>
                        <h3>{largeText2}</h3>
                        <p>{saleTime}</p>
                </div>
                <div className="right">
                        <p>{smallText}</p>
                        <h3>{midText}</h3>
                        <p>{desc}</p>
                        <LINK href={`/product/${product.slug}`}>
                                <button type='button'>
                                        {buttonText}
                                </button>
                        </LINK>
                </div>
                <img src={image} alt={`Footer banner Image ${name}`} className="footer-banner-image"  />
        </div>
    </div>
  )
}

export default FooterBanner