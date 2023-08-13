import React from 'react'
import Product from './Product'

export default function Home() {
  return (
    <>
     <div className="home">
        <h1>Welcome To Ecommerce</h1>
        <h3>Find Amazing Content Below</h3>
        <h2>Featured Products</h2>
     <div className="somehomecontent">
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
     </div>
     </div>
    </>
  )
}
