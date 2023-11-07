import React, { useState } from 'react';

import './TodoContainer.css';
import TodoItem from '../TodoItem/TodoItem';
import ButtonTodo from '../ButtonTodo/ButtonTodo';

const TodoBox = () => {
  const [toDos, setToDos] = useState([{ id: 1, title: '', obs: '' }]);

  const addToDo = () => {
    setToDos((prevToDos) => {
      const newToDo = {
        id: Date.now(), 
        title: '', 
        obs: '',
      };

      return [...prevToDos, newToDo];
    });
  };
  
  const removeToDo = (id) => {
    setToDos((prevToDos) => {
      return prevToDos.filter((toDo) => toDo.id !== id);
    });
  };

  return (
    <section className="todoBox">
      <div className="todoTitle-box">
        <span>Tarefas</span>
      </div>
      <div className="todoList">
        {toDos.map((toDo) => (
          <TodoItem
            key={toDo.id}
            title={toDo.title}
            obs={toDo.obs}
            removeToDo={() => removeToDo(toDo.id)}
          />
        ))}
      </div>
      <ButtonTodo text={'Nova Tarefa'} onClick={addToDo} />
    </section>
  );
};

export default TodoBox;
