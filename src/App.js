import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './App.css';
import BondGrid from './components/BondGrid';

const App = () => {
  const Bond = (title, year, order) => {
    let guessed = false;
    const id = uniqid();
    return { title, year, order, guessed, id };
  };
  const orderedBonds = [
    Bond('Dr. No', 1962, 0),
    Bond('From Russia with Love', 1963, 1),
    Bond('Goldfinger', 1964, 2),
    Bond('Thunderball', 1965, 3),
    Bond('You Only Live Twice', 1967, 4),
  ];
  const [unguessedBonds, setUnguessedBonds] = useState([...orderedBonds]);
  const [guessedBonds, setGuessedBonds] = useState([]);
  const [needsShuffling, setNeedsShuffling] = useState(true);
  useEffect(() => {
    if (needsShuffling) {
      const shuffleBonds = () => {
        const tempBondArray = [...unguessedBonds];
        const shuffledArray = [];
        for (let i = 0; i < unguessedBonds.length; i++) {
          const randomIndex = Math.floor(Math.random() * tempBondArray.length);
          shuffledArray.push(...tempBondArray.splice(randomIndex, 1));
        }
        setUnguessedBonds(shuffledArray);
      };

      shuffleBonds();
      setNeedsShuffling(false);
    }
  }, [needsShuffling]);

  const guessBond = (e) => {
    const bondIndex = unguessedBonds.findIndex(
      (bond) => bond.title === e.currentTarget.dataset.title
    );
    const unguessedClone = [...unguessedBonds];
    const guessedClone = [...guessedBonds];
    guessedClone.push(...unguessedClone.splice(bondIndex, 1));
    guessedClone[guessedClone.length - 1].guessed = true;
    setUnguessedBonds(unguessedClone);
    setGuessedBonds(guessedClone);
  };
  const restart = () => {
    setUnguessedBonds([...orderedBonds]);
    setNeedsShuffling(true);
    setGuessedBonds([]);
  };

  return (
    <div>
      <h2>Correct order</h2>
      <p>{orderedBonds[0].title}</p>
      <p>{orderedBonds[1].title}</p>
      <p>{orderedBonds[2].title}</p>
      <p>{orderedBonds[3].title}</p>
      <p>{orderedBonds[4].title}</p>
      <br></br>
      <BondGrid
        isGuessedGrid={false}
        bondArray={unguessedBonds}
        handleGuess={guessBond}
      />
      <br></br>
      <button onClick={restart}>Restart</button>
      <button onClick={() => setNeedsShuffling(true)}>Shuffle</button>
      <br></br>
      <BondGrid isGuessedGrid={true} bondArray={guessedBonds} />
    </div>
  );
};

export default App;
