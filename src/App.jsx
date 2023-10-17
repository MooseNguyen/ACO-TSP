import { Action, Canvas } from './Components';
import './App.css';
import { useState } from 'react';
import antImage from './assets/ant-28894.png';

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
      <div className="image">
        <img src={antImage} alt="logo-img" />
      </div>
    </div>
  );
}

export default App;
