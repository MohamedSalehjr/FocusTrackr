import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const initialTime = 25 * 60; // 25 minutes in seconds
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval); // Clean up interval on unmount

  }, [isActive, seconds]);

  const handleStartTimer = () => {
    setIsActive(true);
  };

  const handleStopTimer = () => {
    setIsActive(false);
    setSeconds(initialTime); // Reset the timer to 25 minutes
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{formatTime(seconds)}</p>
      {isActive ? (
        <button onClick={handleStopTimer}>Stop Timer</button>
      ) : (
        <button onClick={handleStartTimer}>Start Timer</button>
      )}
    </div>
  );
};

export default CountdownTimer;
