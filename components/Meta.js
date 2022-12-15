import Head from 'next/head'
import React from 'react'

const Meta = ({title,keywords,description,image}) => {
  return (
        <Head>
                <title>{title}</title>
                <link rel="icon" href="glam_icon.png" type="image/x-icon" />
                <meta name='keywords' content={keywords} />
                <meta name='description' content={description} />
                <meta charSet='utf-8' />


                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content="www.testfornow.com" />
                <meta property="og:type" content="website" />
                <meta property="article:publisher" content="Glam&apos;s Haven" />
                <meta property="article:section" content="Women's Clothing" />
                <meta property="article:tag" content="Ecommerce, Women's Clothing store, Glam's Haven" />
                <meta property="og:image" content={image}/>
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="640" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content={image} />
                <meta property="twitter:site" content="@dhouse_of_glam" />
        </Head>
  )
}

Meta.defaultProps={
        title:"Glam's Haven",
        keywords:"online store, ecommerce website,shopping cart, Glam, Haven, Glams Haven, Womens clothing",
        description:"Glam haven is a curated online boutique based in Lagos, Nigeria. We offer the latest trends at a great price. Shop with us today and get Free Shipping on orders of ₦30k or more!.",
        image:"/siteimg.png"
}

export default Meta