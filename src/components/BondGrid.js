import '../styles/BondGrid.css';
import BondCard from './BondCard';

const BondGrid = (props) => {
  const {
    isGuessedGrid,
    bondArray,
    handleGuess,
    orderedBonds,
    includeNonEon,
    toggleEon,
  } = props;

  const isOrdered = (guessedIndex) => {
    if (!isGuessedGrid) {
      return null;
    }
    return bondArray[guessedIndex].id === orderedBonds[guessedIndex].id;
  };
  const eonToggle = isGuessedGrid ? (
    <></>
  ) : (
    <div className="eonToggle-container">
      <input
        type="checkbox"
        onChange={toggleEon}
        id="eonToggle"
        checked={includeNonEon}
      ></input>
      <label htmlFor="eonToggle">Include non-Eon titles</label>
    </div>
  );

  return (
    <div className="grid-container">
      <div className="grid-name-container">
        <h2 className="grid-name">{isGuessedGrid ? 'Guessed' : 'Unguessed'}</h2>
        {eonToggle}
      </div>
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
