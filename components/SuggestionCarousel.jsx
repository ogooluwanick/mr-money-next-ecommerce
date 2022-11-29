import React, { useEffect } from 'react'
import $ from "jquery"
import Link from 'next/link';
import { urlFor } from '../lib/client'



const SuggestionCarousel = ({similarProducts}) => {

        const  initCarousel =()=> {
                var $carousel = $('.banner-carousel') ,
                    sliderWidth = $carousel[0]?.scrollWidth,
                    sliderWidth = $('.banner-carousel')[0].scrollWidth,
                    docWidth = $(window).width(),
                    mouseX = 0,
                    mouseXPercentage = 0,
                    translateValue = 0;
                
                if (sliderWidth <= window.innerWidth) {
                  $carousel.css('justify-content', 'center');
                } else {
                  $carousel.css('justify-content', 'flex-start');
                };

                
              
                $carousel.mousemove(function(event) {
                  mouseX = event.clientX;
                  mouseXPercentage = mouseX / docWidth;
                  translateValue = (sliderWidth - docWidth) * mouseXPercentage;
                  $('.banner-carousel').css('transform', 'translate\(-' + translateValue + 'px' + '\, 0px\)');
                });
                window.addEventListener('resize', initCarousel);
              };
              
        useEffect(() => {
                      initCarousel();
        }, [ ])
        
  return (
        <div class="banner-carousel__wrapper">
                <div class="banner-carousel banner-carousel--square">
                                {
                                        similarProducts.map((product,i)=>(
                                                <div product={product} key={i}>
                                                        <Link href={`/product/${product.slug.current}`}>
                                                                <div class="banner-carousel__figure ">
                                                                        <div class="banner-carousel__img-container">
                                                                                <img  src={urlFor(product.image&&product.image[0])} alt={`product ${product.name}`}   style={{display:"block"}}/>
                                                                        </div>
                                                                        <div className='product-name'>{product.name}</div>
                                                                        <div className='product-price'>₦{product.price}</div>
                                                                </div>
                                                        </Link>
                                                </div>
                                        ))
                                }
                </div>
        </div>
  )
}

export default SuggestionCarousel