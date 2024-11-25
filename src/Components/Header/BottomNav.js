import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import profile from "../../Assets/profile.png"
import logo from "../../Assets/logo.PNG"
//  -------------  FireBase - Logout -------------
import { signOut } from 'firebase/auth'
import { auth } from 'Config/firebase'
//  -------------  Message -------------
import { message } from 'antd';
//  -------------  Auth Context -------------
import { useAuthContext } from 'Context/AuthContext'
import { useCartContext } from 'Context/CartContext'


export default function BottomNav() {

  const [cartItems, setCartItems] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const { isAuth } = useAuthContext()
  const { dispatch } = useAuthContext()
  const { cart, setCart } = useCartContext()

  let user = localStorage.getItem("User")
  user = JSON.parse(user)
  let profileimg
  if (user) {
    profileimg = user.imageUrl
  }

  const handleLogout = (e) => {
    e.preventDefault()
    signOut(auth)
      .then(() => {
        message.success("Loggoed Out")
        localStorage.setItem("Token", "False")
        localStorage.removeItem("User")
      })
      .catch((error) => {
        console.log('error', error)
        // ..
      });
    dispatch({ type: "Set_Logged_Out" })
    localStorage.setItem("Token", "false")
  }

  // useEffect(()=>{

  // },[])


  const handleCheck = () => {
    setIsChecked(!isChecked)
  }

  const CartSytle = {
    "margin": "0",
    "background": "white",
    "color": "black",
    "width": "20px",
    "height": "22px",
    "textAlign": "center",
    "borderRadius": "50%",
    "position": "relative",
    "top": "-43%"
  }

  return (
    <>
      <div className='bottom-container'>
        <div className="container-fluid">
          <div className="row">
            <div className="col text-start">
              <nav className=' text-start d-none d-md-block'>
                <Link to={"/"}>Home</Link>
                <Link to={"/product"}>All Product</Link>
                <Link to={"/about"}>About Us</Link>
              </nav>
              <div className="hamburger">
                <label htmlFor="burger" className="burger d-block d-md-none">
                  <input id="burger" type="checkbox" onChange={handleCheck} />
                  <span />
                  <span />
                  <span />
                </label>
              </div>
            </div>

            <div className="col text-center">
              <img src={logo} className='bottomNav-logo' alt="" />
            </div>
            <div className="col text-end">
              <nav className='d-flex'>
                <Link>
                  <i className="fa-solid fa-magnifying-glass text-md-end" style={{ color: "#ffffff" }} />
                </Link>
                <Link to={"/dashboard/cart"} className='d-none d-md-flex'>
                  <i className="fa-solid fa-cart-shopping" style={{ color: "#ffffff" }} >
                  </i>
                  {
                    cart
                      ?
                      <>
                        {cart.length
                          ?
                          <p style={CartSytle}>{cart.length}</p>
                          :
                          <></>}
                      </>
                      :
                      <></>
                  }
                </Link>
                <Link to={"/dashboard/profile"} className='d-none d-md-inline'>
                  <span className="profile" >
                    <img src={profileimg ? profileimg : profile} alt="" style={{ "width": "35px", "height": "35px", "borderRadius": "50%", "marginRight": "2px", "background": "white" }} />
                  </span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className={`mobile-nav ${isChecked ? "show" : "hide"}`}>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/product"}>All Products</Link>
          <Link to={"/about"}>About Us</Link>
        </nav>
        {
          !isAuth
            ?
            <button className="btn btn-success w-25 px-0">
              <Link to={"/auth/"}>
                Login
              </Link>
            </button>
            :
            <button className="btn btn-danger w-25 px-0" onClick={handleLogout}>
              Logout
            </button>
        }
      </div>
    </>
  )
}
