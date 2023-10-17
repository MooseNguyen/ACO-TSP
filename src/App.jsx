import { Action, Canvas } from './Components';
import './App.css';
import { useState } from 'react';

function App() {
  const [action, setAction] = useState('');
  

  const clearCanvasHandle = () => {
    console.log('CLEAR CLICK!');
    setAction('clear');
  };

  const startACOClick = () => {
    console.log('START CLICK!');
    setAction('start');
  };

  return (
    <div className="app">
      <Canvas action={action} />
      <Action
        clearCanvasClick={clearCanvasHandle}
        startACOClick={startACOClick}
      />
    </div>
  );
}

export default App;
