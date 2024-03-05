import React from 'react'
import Spline from '@splinetool/react-spline';
// ----------- Images -----------------
import img from "../../Assets/best-about-us-pages.png"
import member1 from "../../Assets/member1.png"
import member2 from "../../Assets/member2.png"
import member3 from "../../Assets/member3.png"
import member4 from "../../Assets/member4.png"




export default function AboutUs() {
  return (
    <main>
      <h1 className="text-center my-5 about-heading">
        About US
      </h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 my-4">
            <img src={img} className='about-us-img w-md-100' alt="" />
          </div>
          <div className="col-lg-6 col-md-12 my-4">
            <p>
              Welcome to <b>Ammar E Store</b>, your go-to destination for cutting-edge smartwatches. Our collection features the latest innovations in wearable technology, carefully curated to cater to your lifestyle needs. Whether you're into fitness tracking or seeking a stylish accessory, we have the perfect smartwatch for you. Backed by top brands and genuine products, we ensure quality and reliability with every purchase. Our commitment to exceptional customer service means you'll receive personalized assistance and a seamless shopping experience. With secure payment options and strict privacy policies, you can shop with confidence. Stay ahead of the curve with our constantly updated inventory, showcasing the newest releases and advancements in smartwatch technology. Join us on the journey towards a smarter, more connected future with <b>Ammar E Store</b>.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center my-5 about-heading">
        TEAM MATES
      </h1>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 my-5">
            <div className="team-card">
              <img src={member1} alt="" />
              <h3 className='text-center my-3'>
                <b style={{ "fontFamily": "cursive" }}>
                  John Doe
                </b>
              </h3>
              <span>
                (Founder)
              </span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-5">
            <div className="team-card">
              <img src={member2} alt="" />
              <h3 className='text-center my-3'>
                <b style={{ "fontFamily": "cursive" }}>
                  Jack Oliver
                </b>
              </h3>
              <span>
                (Developer)
              </span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-5">
            <div className="team-card">
              <img src={member3} alt="" />
              <h3 className='text-center my-3'>
                <b style={{ "fontFamily": "cursive" }}>
                  Ava Evelyn
                </b>
              </h3>
              <span>
                (Marketing Specialist)
              </span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-5">
            <div className="team-card">
              <img src={member4} alt="" />
              <h3 className='text-center my-3'>
                <b style={{ "fontFamily": "cursive" }}>
                  Daisy Eleanor
                </b>
              </h3>
              <span>
                (Product Manager)
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ---------- Rate Us ---------- */}
      <Spline scene="https://prod.spline.design/cBFtqj9HZiE9DdcC/scene.splinecode" style={{ "height" : "100vh"}}/>
    </main>
  )
}
