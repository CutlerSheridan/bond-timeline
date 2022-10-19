import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const Bond = (title, year) => {
    let guessed = false;
    return { title, year, guessed };
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

  return (
    <div>
      <p>orderedBond at 0: {orderedBonds[0].title}</p>
      <p>orderedBond at 1: {orderedBonds[1].title}</p>
      <p>orderedBond at 2: {orderedBonds[2].title}</p>
      <p>orderedBond at 3: {orderedBonds[3].title}</p>
      <p>orderedBond at 4: {orderedBonds[4].title}</p>
      <br></br>
      <p>unguessed bond at 0: {unguessedBonds[0].title}</p>
      <p>unguessed bond at 1: {unguessedBonds[1].title}</p>
      <p>unguessed bond at 2: {unguessedBonds[2].title}</p>
      <p>unguessed bond at 3: {unguessedBonds[3].title}</p>
      <p>unguessed bond at 4: {unguessedBonds[4].title}</p>
      <br></br>
      <button onClick={shuffleBonds}>Shuffle</button>
    </div>
  );
};

export default App;
