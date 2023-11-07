import React from 'react';
import PropTypes from 'prop-types';

import './ButtonTodo.css';

const ButtonTodo = ({onClick, text}) => {
  return (
    <div className="buttonTodo_Container">
      <button className="buttonTodo" onClick={onClick}>{text}</button>
    </div>
  );
};

ButtonTodo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default ButtonTodo;