import React, { useEffect, useState } from 'react';
import './TimerContainer.css';

function Timer() {
  const duration = 7200; // A duração do temporizador em segundos (2 horas = 7200 segundos)
  const circumference = 2 * Math.PI * 50; // Circunferência do círculo (2πr)
  const [offset, setOffset] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
      setOffset((prevOffset) => {
        if (prevOffset < circumference) {
          return prevOffset + (circumference / duration);
        } else {
          clearInterval(timerId);
          setShake(false);
          return prevOffset;
        }
      });
    }, 1000); // Mudando de 100 para 1000 para atualizar uma vez por segundo
    return () => clearInterval(timerId);
  }, [circumference, duration]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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
          <text x="52.5" y="52.5" textAnchor="middle" dominantBaseline="middle" fontSize="10px" fill="#000">
            {formatTime(timeLeft)}
          </text>
        </svg>
      </div>
    </div>
  );
}

export default Timer;
