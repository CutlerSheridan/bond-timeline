import '../styles/BondGrid.css';
import BondCard from './BondCard';

const BondGrid = (props) => {
  const { isGuessedGrid, bondArray, handleGuess, orderedBonds } = props;

  const isOrdered = (guessedIndex) => {
    if (!isGuessedGrid) {
      return null;
    }
    return bondArray[guessedIndex].title === orderedBonds[guessedIndex].title;
  };

  return (
    <div>
      <h2>{isGuessedGrid ? 'Guessed' : 'Unguessed'}</h2>
      <div
        className={`grid ${isGuessedGrid ? 'grid-guessed' : 'grid-unguessed'}`}
      >
        {bondArray.map((b, index) => {
          return (
            <BondCard
              bond={b}
              handleGuess={handleGuess}
              isCorrect={isOrdered(index)}
              key={b.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BondGrid;
