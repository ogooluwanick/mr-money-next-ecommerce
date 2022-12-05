import Link from 'next/link'
import React from 'react'

export const DropdownLink = ({href,children,...rest}) => {
  return (
        <Link href={href}>
                {children}
        </Link>
  )
}
