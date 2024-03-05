import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length 
      ? 
      <div className="timer d-flex">
      <div className='days d-flex flex-column mx-2 text-light'>
        {timeLeft.days}
        <span>
          day
        </span>
      </div>
      <div className="semi-colon">
        :
      </div>
      <div className='hour d-flex flex-column mx-2 text-light'>
        {timeLeft.hours}
        <span>
          Hour
        </span>
      </div>
      <div className="semi-colon">
        :
      </div>
      <div className='minute d-flex flex-column mx-2 text-light'>
        {timeLeft.minutes}
        <span>
          Minute
        </span>
      </div>
      <div className="semi-colon">
        :
      </div>
      <div className='sec d-flex flex-column mx-2 text-light'>
        {timeLeft.seconds}
        <span>
          Sec
        </span>
      </div>
    </div>
      : <span>Time's up!</span>}
    </div>
  );
}

export default CountdownTimer;
