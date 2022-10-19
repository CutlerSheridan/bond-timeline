import '../styles/BondCard.css';

const BondCard = (props) => {
  const { bond, handleGuess, isCorrect } = props;
  const guessedClass = bond.guessed ? 'guessed' : '';
  return (
    <div className={`${guessedClass} ${isCorrect ? 'correct' : 'incorrect'}`}>
      <p onClick={handleGuess}>{bond.title}</p>
    </div>
  );
};

export default BondCard;
