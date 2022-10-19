import '../styles/BondCard.css';

const BondCard = (props) => {
  const { bond, handleGuess } = props;
  const guessedClass = bond.guessed ? 'guessed' : '';
  return (
    <div className={guessedClass}>
      <p onClick={handleGuess}>{bond.title}</p>
    </div>
  );
};

export default BondCard;
