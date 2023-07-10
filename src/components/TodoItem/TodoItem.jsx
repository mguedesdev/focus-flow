import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './TodoItem.css';
import { IoIosClose } from 'react-icons/io';

const TodoItem = ({ title, obs, removeToDo }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [titleState, setTitleState] = useState(title);
  const [obsState, setObsState] = useState(obs);
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [obsState]);

  return (
    <div className={`todoItem ${isChecked ? 'checked' : ''}`}>
      <label className="text-checkbox">
        <input
          className="title-todoItem"
          value={titleState}
          onChange={(event) => setTitleState(event.target.value)}
        />
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <button className="button-todoItem" onClick={removeToDo}>
          <IoIosClose />
        </button>
      </label>
      <textarea
        placeholder="Adicione a observação"
        className="obs-todoItem"
        value={obsState}
        onChange={(event) => setObsState(event.target.value)}
        ref={textareaRef}
        rows={1}
      />
    </div>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  obs: PropTypes.string,
  removeToDo: PropTypes.func.isRequired,
};

export default TodoItem;
