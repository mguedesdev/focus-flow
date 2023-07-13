import React, { useEffect, useState, useCallback } from 'react';
import './TimerContainer.css';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function Timer() {
  const duration = 10;
  const circumference = 2 * Math.PI * 50;
  const [offset, setOffset] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [shake, setShake] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  // const [timerList, setTimerList] = useState([1500, 300, 1500, 300, 1500, 900]);

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 0.01 : 0);
        setOffset((prevOffset) => {
          if (prevOffset < circumference) {
            return prevOffset + (circumference / (duration * 100));
          } else {
            clearInterval(timerId);
            setShake(true);
            return prevOffset;
          }
        });
      }, 10);
    }
    return () => clearInterval(timerId);
  }, [circumference, duration, isRunning]);

  const formatTime = useCallback((time) => {
    const totalSeconds = Math.round(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);
  
  const toggleTimer = useCallback(() => {
    setIsRunning((prevIsRunning) => {
      const newState = !prevIsRunning;
      if (newState === false && timeLeft === 0) {
        setShake(false);
      }
      return newState;
    });
  }, [timeLeft]);

  return (
    <div className="timerContainer">
      <div className="timer-container"> 
        <svg className={`timer ${shake ? 'shake' : ''}`} viewBox="0 0 105 105">
          <circle
            className="timer-indicator"
            cx="52.5"
            cy="52.5"
            r="50"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - offset}
          />
          <circle
            className="timer-indicator"
            cx="52.5"
            cy="52.5"
            r="50"
            opacity="0.4"
          />
          <text x="52.5" y="52.5" textAnchor="middle" dominantBaseline="middle" fontSize="28px" fontWeight={600} fill="#ffffff">
            {formatTime(timeLeft)}
          </text>
        </svg>
        <div className="timer-list">
          Oi
        </div>
        <button className="button-timer" onClick={toggleTimer}>
          {isRunning ? <FaPauseCircle/> : <FaPlayCircle/>}
        </button>
      </div>
    </div>
  );
}

export default Timer;
