import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../images/ecommerce.png"
export default function Header() {
  return (
   <>
      <ReactNavbar
       burgerColorHover="#eb4034"
       burgerColor="black"
       navColor1="white"
       logo={logo}
       logoWidth="4rem"
       link1Text="Home"
       link2Text="Product"
       link3Text="Contact"
       link4Text="About"
       link1Url="/"
       link2Url="/product"
       link3Url="/contact"
       link4Url="/about"
       link1Color="black"
       link1Size="1.3rem"
       nav1JustifyContent="flex-end"
       nav2JustifyContent="flex-end"
       nav3JustifyContent="flex-start"
       nav4JustifyContent="flex-start"
       link1ColorHover="red"
       link1Margin="1vmax"
      />
   </>
  )
}
