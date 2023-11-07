import React, { useEffect, useState, useCallback } from 'react';
import './TimerContainer.css';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function Timer() {
  const timers = [900, 300, 900, 300, 900, 300, 900, 1500];
  const circumference = 2 * Math.PI * 50;
  const [timeLeft, setTimeLeft] = useState(timers[0] * 1000);
  const [shake, setShake] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listTimers, setListTimers] = useState(timers.slice(0, 3));
  const [countPomodoro, setCountPomodoro] = useState(0);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      const endTime = Date.now() + timeLeft;

      timerId = setInterval(() => {
        const newTimeLeft = endTime - Date.now();

        if (newTimeLeft <= 0) {
          let newCurrentIndex = (currentIndex + 1) % timers.length;
          setCurrentIndex(newCurrentIndex);
          setTimeLeft(timers[newCurrentIndex] * 1000);
          setListTimers(getNextTimers(newCurrentIndex));
          if (newCurrentIndex % 2 === 0) setCountPomodoro(prevCount => prevCount + 1);
          setIsRunning(false); 
          setShake(true);
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 10);
    }

    return () => clearInterval(timerId); 
  }, [isRunning, currentIndex]);

  const getNextTimers = (index) => {
    return timers.slice(index, index + 3).concat(timers.slice(0, 3)).slice(0, 3);
  };

  useEffect(() => {
    if (isRunning) setShake(false);
  }, [isRunning]);

  const getOffset = () => (circumference * timeLeft) / (timers[currentIndex] * 1000);
  
  const formatTime = useCallback((time) => {
    const totalSeconds = Math.round(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);
  
  const toggleTimer = useCallback(() => setIsRunning(prevIsRunning => !prevIsRunning), []);

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
            strokeDashoffset={getOffset() - circumference }
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
          {listTimers.map((listTimer, index) => <p key={index}> {formatTime(listTimer * 1000)} </p>)}
        </div>
        <div className="pomodoro-count">
          <span>Pomodoros</span>
          {countPomodoro}
        </div>
        <button className="button-timer" onClick={toggleTimer}>
          {isRunning ? <FaPauseCircle/> : <FaPlayCircle/>}
        </button>
      </div>
    </div>
  );
}

export default Timer;
