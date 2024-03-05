import React from 'react'

export default function MiddleNav() {
  return (
    <div className='middle-container  d-none d-md-block'>
      <p className='mx-auto mt-3' style={{ "width": "fit-content" }}>
        Send 200 PKR" & Confirm Order
      </p>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="socialLink-container">
              <i className="fa-brands fa-facebook-f" />
              <i className="fa-brands fa-instagram" />
              <i className="fa-brands fa-youtube" />
              <i className="fa-brands fa-tiktok" />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 " style={{"fontSize":"smaller"}}>
            Advance 200 PKR" Required For Order Confirmation
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  )
}
