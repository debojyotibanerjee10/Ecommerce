import React from 'react'
import playstore from "../images/playstore1.png"
import appstore from "../images/apple.jpg"
export default function Footer() {
  return (
    <>
        <div className="footer">
            <div className="leftfooter">
                <h4>Download our App</h4>
                <p>Download App</p>
                <img src={playstore} alt="playstore" />
                <img src={appstore} alt="appstore" />
            </div>
            <div className="midfooter">
                <h4>Ecommerce</h4>
                <p>High Quality Products</p>
                <p>Copyrights 2023 &copy;</p>
            </div>
            <div className="rightfooter">
                <h4>Follow us</h4>
                <a href="/">Instagram</a>
                <a href="/">LinkedIn</a>
                <a href="/">Facebook</a>
            </div>
        </div>
    </>
  )
}
