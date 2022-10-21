import '../styles/GameOverBanner.css';

const GameOverBanner = (props) => {
  return (
    <div
      className={`gameOver-container ${
        props.winOrLose !== null ? 'gameOver-animate' : ''
      }`}
    >
      <div className="gameOver-banner">
        <div className="gameOver-text">You {props.winOrLose}!</div>
      </div>
    </div>
  );
};

export default GameOverBanner;
