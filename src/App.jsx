import React from 'react';
import TodoBox from './components/TodoContainer/TodoContainer';
import Timer from './components/TimerContainer/TimerContainer';

import './App.css';

function App() {

  return (
    <div className="container">
      <Timer/>
      <TodoBox/>
    </div>
  );
}

export default App;
