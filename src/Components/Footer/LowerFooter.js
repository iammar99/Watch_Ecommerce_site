import React from 'react'

export default function LowerFooter() {
    let year = new Date
    year = year.getFullYear()
    return (
        <div className="lowerFooter-container flex-sm-column flex-column flex-md-row">
            <div className="text-start  my-3 my-md-0">
                @ Ammar E Store
            </div>
            <div className="text-center  my-3 my-md-0">
                &copy; {year} |  All  rights  reserved.
            </div>
            <div className="text-end my-3 my-md-0">
                <div className="socialLink-container">
                    <i className="fa-brands fa-facebook-f" style={{ color: "#ffffff" }} />
                    <i className="fa-brands fa-instagram" style={{ color: "#ffffff" }} />
                    <i className="fa-brands fa-youtube" style={{ color: "#ffffff" }} />
                    <i className="fa-brands fa-tiktok" style={{ color: "#ffffff" }} />
                </div>
            </div>
        </div>
    )
}
