import React from 'react';
import PropTypes from 'prop-types';
import './TimerDisplay.css';

const TimerDisplay = ({ shake, circumference, offset, formatTime, timeLeft }) => {
  return (
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

  );
};

TimerDisplay.propTypes = {
  shake: PropTypes.bool.isRequired,
  circumference: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired
};


export default TimerDisplay;