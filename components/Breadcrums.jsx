import Link from 'next/link';
import React from 'react';

export default function Breadcrumbs({ activeStep = 0 }) {
        const crumbs=[
                {name:"Login" , link:"/login"},
                {name:"Shipping" , link:"/shipping"},
                {name:"Place Order" , link:"/place_order"},
        ]
  return (
    <div className="breadcrumbs-container">
      {
               crumbs.map( (step, index) => (
                        <Link href={ ` ${ index <= activeStep ? step.link  : '' }`   }   >
                                <div key={index} 
                                        className={`breadcrumb
                                        ${ index <= activeStep
                                                ? 'active-crum'
                                                : 'inactive-crum'
                                        }`
                                }
                                >
                                        {step.name}
                                </div>
                        </Link>
        )
      )}
    </div>
  );
}