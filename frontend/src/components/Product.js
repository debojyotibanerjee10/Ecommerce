import React from 'react'
import test from "../images/test.webp"
import ReactStars from "react-rating-stars-component"
export default function Product() {
    const options={
        edit:false,
        value:2.5,
        isHalf:true,
    }
  return (
    <>
    <div className="product">
    <img src={test} alt="img" />
        <p>Blue Tshirt</p>
        <p>Price:1200 5 Reviews</p>
        <ReactStars {...options}/>
    </div>
    </>
  )
}
