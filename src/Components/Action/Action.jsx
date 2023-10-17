import './Action.css';

// eslint-disable-next-line react/prop-types
export default function Action({ clearCanvasClick, startACOClick }) {
  const handleClearButtonClick = () => {
    clearCanvasClick();
  };
  const handleStartButtonClick = () => {
    startACOClick();
  };

  return (
    <div className="action">
      <div className="title">
        <h2>DEMO</h2>
        <h1>Traveling salesman problem with Ant colony optimization.</h1>
      </div>
      <ul>
        How to usage:
        <li>
          Click on the screen in the left to create the city (print at a dot)
        </li>
        <li>Press Start button and wait for an algorithm finish </li>
      </ul>
      <div className="action-btn">
        <div>
          <button id="start-btn" onClick={handleStartButtonClick}>
            Start
          </button>
          <span>Start the algorithm</span>
        </div>
        <div>
          <button id="clear-btn" onClick={handleClearButtonClick}>
            Clear
          </button>
          <span>Reset screen</span>
        </div>
      </div>
    </div>
  );
}
