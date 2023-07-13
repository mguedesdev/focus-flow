import React, { useEffect, useState, useCallback } from 'react';
import './TimerContainer.css';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

function Timer() {
  const duration = 5 * 1000; // Converted to milliseconds
  const circumference = 2 * Math.PI * 50;
  const [timeLeft, setTimeLeft] = useState(duration);
  const [shake, setShake] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [notificationSent, setNotificationSent] = useState(false); // Novo estado

  // Solicita permissão para notificações quando o componente for montado
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (isRunning) {
      setStartTime(Date.now() - (duration - timeLeft));
    }
  }, [isRunning, duration, timeLeft]);

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newTimeLeft = duration - elapsedTime;

        setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
        if (newTimeLeft <= 0) {
          setShake(true);
          // Enviar uma notificação quando o tempo se esgotar, mas apenas se uma notificação não tiver sido enviada ainda
          if (!notificationSent) {
            new Notification('Timer finished!');
            setNotificationSent(true);
          }
        }
      }, 10);
    } else {
      setNotificationSent(false); // Restaura a flag quando o timer é interrompido
    }
    return () => clearInterval(timerId);
  }, [duration, isRunning, startTime, notificationSent]);

  const getOffset = () => {
    if (isRunning && startTime) {
      const elapsedTime = Date.now() - startTime;
      return (circumference * elapsedTime) / duration;
    } else {
      return circumference;
    }
  };
  

  const formatTime = useCallback((time) => {
    const totalSeconds = Math.round(time / 1000); // Converted to seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);
  
  const toggleTimer = useCallback(() => {
    setIsRunning((prevIsRunning) => {
      const newState = !prevIsRunning;
      if (newState === false && timeLeft <= 0) {
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
