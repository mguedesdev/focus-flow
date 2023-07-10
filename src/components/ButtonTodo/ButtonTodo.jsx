import React from 'react';
import PropTypes from 'prop-types';

import './ButtonTodo.css';

const ButtonTodo = ({onClick}) => {
  return (
    <button className="buttonTodo" onClick={onClick}>Nova Tarefa</button>
  );
};

ButtonTodo.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonTodo;