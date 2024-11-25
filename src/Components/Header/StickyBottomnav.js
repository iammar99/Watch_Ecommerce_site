import React from 'react'
import { Link } from 'react-router-dom'
import profile from "../../Assets/profile.png"
import { useCartContext } from 'Context/CartContext'

export default function StickyBottomnav() {
    let user = localStorage.getItem("User")
    // ---------------- Cart ----------------
    const { cart } = useCartContext()

    user = JSON.parse(user)
    let profileimg
    if (user) {
        profileimg = user.imageUrl
    }

    const CartSytle = {
        "background": "black",
        "color": "white",
        "width": "20px",
        "height": "22px",
        "borderRadius": "50%",
        "position": "relative",
        "bottom": "48%",
        "left": "109%",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "fontSize": "16px"
    }

    return (
        <div className='Sticky-Bottom-Nav d-block d-md-none'>
            <div className="d-flex" style={{ "justifyContent": "space-evenly", "margin": "auto 0", "fontSize": "x-large" }}>
                <Link to={"/dashboard/cart"}>
                    <i className="fa-solid fa-cart-shopping" style={{ color: "#000000" }} />
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
                <Link to={"/"}>
                    <i className="fa-solid fa-home" style={{ color: "#000000" }} />
                </Link>
                <Link to={"/dashboard/profile"}>
                    <div className="profile">
                        <img src={profileimg ? profileimg : profile} alt="" style={{ "width": "45px", "height": "45px", "borderRadius": "50%", "marginRight": "2px" }} />
                    </div>
                </Link>
            </div>
        </div>
    )
}
