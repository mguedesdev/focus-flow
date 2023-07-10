import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="todoItem">
      <label className="text-checkbox">
        Atividade 1
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
      </label>

      {/* <label className="chk">
        <input type="checkbox" name="exemplo" />
        <span></span>
      </label> */}
    </div>
  );
};

export default TodoItem;
