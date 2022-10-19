import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './App.css';
import BondGrid from './components/BondGrid';

const App = () => {
  const Bond = (title, year) => {
    let guessed = false;
    const id = uniqid();
    return { title, year, guessed, id };
  };
  const orderedBonds = [
    Bond('Dr. No', 1962),
    Bond('From Russia with Love', 1963),
    Bond('Goldfinger', 1964),
    Bond('Thunderball', 1965),
    Bond('You Only Live Twice', 1967),
  ];
  const [unguessedBonds, setUnguessedBonds] = useState([...orderedBonds]);
  const [guessedBonds, setGuessedBonds] = useState([]);
  useEffect(() => {
    shuffleBonds();
  }, []);

  const shuffleBonds = () => {
    const tempBondArray = [...unguessedBonds];
    const shuffledArray = [];
    for (let i = 0; i < unguessedBonds.length; i++) {
      const randomIndex = Math.floor(Math.random() * tempBondArray.length);
      shuffledArray.push(...tempBondArray.splice(randomIndex, 1));
    }
    setUnguessedBonds(shuffledArray);
  };
  const guessBond = (e) => {
    const bondIndex = unguessedBonds.findIndex(
      (bond) => bond.title === e.target.textContent
    );
    const unguessedClone = [...unguessedBonds];
    const guessedClone = [...guessedBonds];
    guessedClone.push(...unguessedClone.splice(bondIndex, 1));
    setUnguessedBonds(unguessedClone);
    setGuessedBonds(guessedClone);
    console.log('unguessedClone');
    console.log(unguessedClone);
    console.log('guessedClone');
    console.log(guessedClone);
  };

  return (
    <div>
      <p>orderedBond at 0: {orderedBonds[0].title}</p>
      <p>orderedBond at 1: {orderedBonds[1].title}</p>
      <p>orderedBond at 2: {orderedBonds[2].title}</p>
      <p>orderedBond at 3: {orderedBonds[3].title}</p>
      <p>orderedBond at 4: {orderedBonds[4].title}</p>
      <br></br>
      <BondGrid
        isGuessedGrid={false}
        bondArray={unguessedBonds}
        handleGuess={guessBond}
      />
      <br></br>
      <button onClick={shuffleBonds}>Shuffle</button>
      <br></br>
      <BondGrid isGuessedGrid={true} bondArray={guessedBonds} />
    </div>
  );
};

export default App;
