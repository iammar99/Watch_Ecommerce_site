import { useAuthContext } from 'Context/AuthContext'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function UpperFooter() {

  const [email , setEmail] = useState("")
  const isAuth = useAuthContext()
  let auth = isAuth.isAuth  

  const handleChange = (e) => {setEmail(s=>({...s,[e.target.name]:e.target.value}))}
  
  const navigate = useNavigate()
  const handleSubmit = () => {
    localStorage.setItem("Email",email.email)
    navigate("/auth/register")
  } 
  return (
    <>
      <div className="container" style={{ "flex": "1 0 auto" }}>
        <div className="row">
          <div className="col-lg-4 col-md-12 ">
            <p className='footerLink-heading'>
              Usefull Links
            </p>
            <div className="footerLink-container">
              <Link>Contact Us</Link>
              <Link to={"/help-center"}>FAQS</Link>
              <Link>Refund Policy</Link>
              <Link>Shipping Policy</Link>
              <Link>Terms Of Services</Link>
              <Link>Privacy Policy</Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-12  mt-5 mt-lg-0">
            <p className='footerLink-heading '>
              Let's get in touch
            </p>
            <p style={{ "color": "rgb(201, 201, 201)", "fontSize": "smaller" }}>
              Sign up for our newsletter and receive 10% off your
            </p>
            <div className="input-container">
              <input
                placeholder="Email Address"
                type="email"
                name='email'
                onChange={handleChange}
                disabled={auth}
              />
              <button className="invite-btn" type="button" onClick={handleSubmit}>
                Invite
              </button>
            </div>

          </div>
          <div className="col-lg-4 col-md-12 ">

          </div>
        </div>

      </div>
    </>
  )
}
