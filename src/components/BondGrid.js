import '../styles/BondGrid.css';
import BondCard from './BondCard';

const BondGrid = (props) => {
  const { isGuessedGrid, bondArray, handleGuess } = props;

  return (
    <div className={isGuessedGrid ? 'grid-guessed' : 'grid-unguessed'}>
      <h2>{isGuessedGrid ? 'Guessed' : 'Unguessed'}</h2>
      {bondArray.map((b) => {
        return <BondCard bond={b} handleGuess={handleGuess} key={b.id} />;
      })}
    </div>
  );
};

export default BondGrid;
