import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './App.css';
import BondGrid from './components/BondGrid';

const App = () => {
  const Bond = (title, year) => {
    const id = uniqid();
    let guessed = false;
    return {
      title,
      year,
      guessed,
      id,
    };
  };
  // if not in state, objects are recreated every render and ids don't match
  const [orderedBonds] = useState([
    Bond('Dr. No', 1962),
    Bond('From Russia with Love', 1963),
    Bond('Goldfinger', 1964),
    Bond('Thunderball', 1965),
    Bond('You Only Live Twice', 1967),
  ]);
  const [unguessedBonds, setUnguessedBonds] = useState([...orderedBonds]);
  const [guessedBonds, setGuessedBonds] = useState([]);
  const [needsShuffling, setNeedsShuffling] = useState(true);
  const [score, setScore] = useState(0);

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
  useEffect(() => {
    if (guessedBonds.length >= 1) {
      const lastGuessedIndex = guessedBonds.length - 1;
      const lastGuessed = guessedBonds[lastGuessedIndex];
      const matchingOrdered = orderedBonds[lastGuessedIndex];
      if (lastGuessed.id === matchingOrdered.id) {
        setScore((prevScore) => prevScore + 1);
        if (lastGuessed.id === orderedBonds[orderedBonds.length - 1].id) {
          // win logic
        }
      } else {
        // end game logic
      }
    }
  }, [guessedBonds]);

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
    guessedBonds.forEach((bond) => (bond.guessed = false));
    setGuessedBonds([]);
    setUnguessedBonds([...orderedBonds]);
    setNeedsShuffling(true);
    setScore(0);
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
      <h3>
        Score: {score} / {orderedBonds.length}
      </h3>
      <BondGrid
        isGuessedGrid={false}
        bondArray={unguessedBonds}
        handleGuess={guessBond}
      />
      <br></br>
      <button onClick={restart}>Restart</button>
      <button onClick={() => setNeedsShuffling(true)}>Shuffle</button>
      {/* <button
        onClick={() => {
          console.log('1st ordered');
          console.log(orderedBonds[0]);
          console.log('1st unguessed');
          console.log(unguessedBonds[0]);
          console.log('1st guessed');
          console.log(guessedBonds[0]);
        }}
      >
        log 1st bonds
      </button> */}
      <br></br>
      <BondGrid
        isGuessedGrid={true}
        bondArray={guessedBonds}
        orderedBonds={orderedBonds}
      />
    </div>
  );
};

export default App;
