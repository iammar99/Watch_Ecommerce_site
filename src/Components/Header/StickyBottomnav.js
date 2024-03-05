import React from 'react'
import { Link } from 'react-router-dom'
import profile from "../../Assets/profile.png"

export default function StickyBottomnav() {
    let user = localStorage.getItem("User")
    user = JSON.parse(user)
    let profileimg
    if (user) {
        profileimg = user.imageUrl
    }
    return (
        <div className='Sticky-Bottom-Nav d-block d-md-none'>
            <div className="d-flex" style={{ "justifyContent": "space-evenly", "margin": "auto 0", "fontSize": "x-large" }}>
                <Link to={"/dashboard/cart"}>
                    <i className="fa-solid fa-bag-shopping" style={{ color: "#000000" }} />
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
