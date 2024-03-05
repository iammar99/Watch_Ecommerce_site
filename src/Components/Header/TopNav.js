import React, { useState } from 'react'
import CountdownTimer from 'Components/Timer/CountDown'

export default function TopNav() {
  const [days, setDays] = useState("4")
  const [hour, setHour] = useState("4")
  const [minute, setminute] = useState("4")
  const [sec, setSec] = useState("4")


  return (
    <div className="topnav-container d-flex justify-content-center">
      <h5 className="text-center text-light me-3">
        Sales Ends in:
      </h5>
      <div className='text-light'>
        <CountdownTimer targetDate="2024-03-18T00:00:00" />
      </div>
    </div>
  )
}
