import React from 'react';

import './TodoContainer.css';
import TodoItem from '../TodoItem/TodoItem';
import { IoMdSettings } from 'react-icons/io';
import ButtonTodo from '../ButtonTodo/ButtonTodo';

const TodoBox = () => {
  return (
    <section className="todoBox">
      <div className="todoTitle-box">
        <span>Tarefas</span>
        <button className="button--todo-settings" type="button"><IoMdSettings/></button>
      </div>
      <div className="todoList">
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
        <TodoItem/>
      </div>
      <ButtonTodo/>

    </section>
  );
};

export default TodoBox;