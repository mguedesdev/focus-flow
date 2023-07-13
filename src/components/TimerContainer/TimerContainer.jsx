import React, { useEffect, useState, useCallback } from 'react';
import './TimerContainer.css';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function Timer() {
  const timers = [6, 3, 6, 3, 6, 3, 6, 12];
  const circumference = 2 * Math.PI * 50;
  const [timeLeft, setTimeLeft] = useState(timers[0] * 1000);
  const [shake, setShake] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listTimers, setListTimers] = useState(timers.slice(0, 3));
  const [countPomodoro, setCountPomodoro] = useState(0);

  useEffect(() => {
    if (isRunning) {
      setStartTime(Date.now() - (timers[currentIndex] * 1000 - timeLeft));
    }
  }, [isRunning, currentIndex, timeLeft]);

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newTimeLeft = timers[currentIndex] * 1000 - elapsedTime;
    
        setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
        if (newTimeLeft <= 0) {
          let newCurrentIndex = (currentIndex + 1) % timers.length;
          setCurrentIndex(newCurrentIndex);
          setTimeLeft(timers[newCurrentIndex] * 1000);
          if (newCurrentIndex + 3 > timers.length) {
            setListTimers(timers.slice(newCurrentIndex).concat(timers.slice(0, 3 - (timers.length - newCurrentIndex))));
          } else {
            setListTimers(timers.slice(newCurrentIndex, newCurrentIndex + 3));
          }          
          if (newCurrentIndex % 2 === 0) {
            setCountPomodoro(prevCount => prevCount + 1);
          }
          clearInterval(timerId); 
          setIsRunning(false); 
          setShake(true);
        }
      }, 10);
    }

    return () => clearInterval(timerId); 
  }, [timers, isRunning, startTime, currentIndex, timeLeft]);

  useEffect(() => {
    if (isRunning) {
      setShake(false);
    }
  }, [isRunning]);
  
  const getOffset = () => {
    if (isRunning && startTime) {
      const elapsedTime = Date.now() - startTime;
      return (circumference * elapsedTime) / (timers[currentIndex] * 1000);
    } else {
      return circumference;
    }
  };
  
  const formatTime = useCallback((time) => {
    const totalSeconds = Math.round(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);
  
  const toggleTimer = useCallback(() => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  }, []);


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
            strokeDashoffset={circumference - getOffset()}
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
