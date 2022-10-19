import '../styles/BondCard.css';

const BondCard = (props) => {
  const { bond, handleGuess, isCorrect } = props;
  const guessedClass = bond.guessed ? 'bond-guessed' : 'bond-unguessed';
  return (
    <div
      className={`bond ${guessedClass} ${
        isCorrect ? 'bond-correct' : 'bond-incorrect'
      }`}
      onClick={handleGuess}
      data-title={bond.title}
    >
      <p>{bond.title}</p>
      <p className={`bond-year ${guessedClass}`}>{bond.year}</p>
    </div>
  );
};

export default BondCard;
