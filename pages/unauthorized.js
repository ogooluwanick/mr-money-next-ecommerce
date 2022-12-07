import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export default function Unauth() {
       const router= useRouter()
  return (
        <div>
                <img src='/accessPage.svg' height="80vh" width="80vw"/>
                <h1>We are Sorry...</h1>
                <p>{router.query.message}</p>
                <button type='button' onClick={() => router.push("/")}>Go back</button>

        </div>
  )
}
