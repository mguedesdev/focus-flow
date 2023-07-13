import React, { useState } from 'react';

import './TodoContainer.css';
import TodoItem from '../TodoItem/TodoItem';
import { IoMdSettings } from 'react-icons/io';
import ButtonTodo from '../ButtonTodo/ButtonTodo';

const TodoBox = () => {
  const [toDos, setToDos] = useState([{ id: 1, title: 'Tarefa 1', obs: '' }]);

  const addToDo = () => {
    setToDos((prevToDos) => {
      const newTaskId = prevToDos.length === 0 ? 1 : prevToDos[prevToDos.length - 1].id + 1;
      const newToDo = {
        id: newTaskId,
        title: `Tarefa ${newTaskId}`,
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
        <button className="button--todo-settings" type="button" aria-label="Configurações">
          <IoMdSettings />
        </button>
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
