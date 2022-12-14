import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './App.css';
import BondGrid from './components/BondGrid';
import GameOverBanner from './components/GameOverBanner';
import Footer from './components/Footer';

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
  // if variable isn't in state, objects are recreated every render and ids don't match
  const [orderedBonds, setOrderedBonds] = useState([
    Bond('Dr. No', 1962),
    Bond('From Russia with Love', 1963),
    Bond('Goldfinger', 1964),
    Bond('Thunderball', 1965),
    Bond('You Only Live Twice', 1967),
    Bond("On Her Majesty's Secret Service", 1969),
    Bond('Diamonds Are Forever', 1971),
    Bond('Live and Let Die', 1973),
    Bond('The Man with the Golden Gun', 1974),
    Bond('The Spy Who Loved Me', 1977),
    Bond('Moonraker', 1979),
    Bond('For Your Eyes Only', 1981),
    Bond('Octopussy', 1983),
    Bond('A View to a Kill', 1985),
    Bond('The Living Daylights', 1987),
    Bond('Licence to Kill', 1989),
    Bond('GoldenEye', 1995),
    Bond('Tomorrow Never Dies', 1997),
    Bond('The World Is Not Enought', 1999),
    Bond('Die Another Day', 2002),
    Bond('Casino Royale', 2006),
    Bond('Quantum of Solace', 2008),
    Bond('Skyfall', 2012),
    Bond('Spectre', 2015),
    Bond('No Time to Die', 2021),
  ]);
  const [nonEonBonds] = useState([
    Bond('Casino Royale (non-Eon)', 1967),
    Bond('Never Say Never Again', 1983),
  ]);
  const [unguessedBonds, setUnguessedBonds] = useState([...orderedBonds]);
  const [guessedBonds, setGuessedBonds] = useState([]);
  const [needsShuffling, setNeedsShuffling] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem('bestScore') !== 'undefined'
      ? JSON.parse(localStorage.getItem('bestScore'))
      : 0
  );
  const [winOrLose, setWinOrLose] = useState(null);
  const [includeNonEon, setIncludeNonEon] = useState(false);

  // check for end of game
  useEffect(() => {
    if (guessedBonds.length >= 1) {
      const lastGuessedIndex = guessedBonds.length - 1;
      const lastGuessed = guessedBonds[lastGuessedIndex];
      const matchingOrdered = orderedBonds[lastGuessedIndex];
      if (lastGuessed.id === matchingOrdered.id) {
        // this conditional prevents getting perfect score by using Reveal
        if (
          guessedBonds.length < orderedBonds.length ||
          score === orderedBonds.length - 1
        ) {
          setScore(guessedBonds.length);
          if (lastGuessed.id === orderedBonds[orderedBonds.length - 1].id) {
            setWinOrLose('win');
          }
        }
      } else {
        const unguessedGrid = document.querySelector('.grid');
        unguessedGrid.classList.add('static');
        setWinOrLose('lose');
      }
    }
  }, [guessedBonds, unguessedBonds]);
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);
  useEffect(() => {
    const orderedCopy = [...orderedBonds];
    let unguessedCopy = [...unguessedBonds];
    const firstIndex = orderedCopy.findIndex((x) => x.year === 1967);
    const secondIndex = orderedCopy.findIndex((x) => x.year === 1983);

    if (includeNonEon) {
      orderedCopy.splice(secondIndex + 1, 0, nonEonBonds[1]);
      orderedCopy.splice(firstIndex, 0, nonEonBonds[0]);
      unguessedCopy.push(...nonEonBonds);
    } else {
      if (
        orderedCopy.reduce((prev, current) => {
          if (current.year === 1983) {
            return prev + 1;
          }
          return prev;
        }, 0) === 2
      ) {
        orderedCopy.splice(secondIndex + 1, 1);
        orderedCopy.splice(firstIndex, 1);
        unguessedCopy = unguessedCopy.filter(
          (bond) =>
            bond.id !== nonEonBonds[0].id && bond.id !== nonEonBonds[1].id
        );
        let guessedCopy = [...guessedBonds];
        guessedCopy = guessedCopy.filter(
          (bond) =>
            bond.id !== nonEonBonds[0].id && bond.id !== nonEonBonds[1].id
        );
        setGuessedBonds(guessedCopy);
      }
    }

    setOrderedBonds(orderedCopy);
    setUnguessedBonds(unguessedCopy);
  }, [includeNonEon]);
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
    localStorage.setItem('bestScore', JSON.stringify(bestScore));
  }, [bestScore]);

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
    setWinOrLose(null);
    const unguessedGrid = document.querySelector('.grid');
    unguessedGrid.classList.remove('static');
  };
  const revealAnswers = () => {
    orderedBonds.forEach((bond) => (bond.guessed = true));
    setUnguessedBonds([]);
    setGuessedBonds([...orderedBonds]);
  };
  const toggleEon = () => {
    setIncludeNonEon((prevState) => !prevState);
  };
  const clearBestScore = () => {
    setBestScore(score);
  };

  return (
    <div className="game-container">
      <header>
        <div className="score-container">
          <div className="score-label">Score:</div>
          <div className="score">
            {score}/{orderedBonds.length}
          </div>
        </div>
        <h1>007</h1>
        <div className="score-container">
          <div className="score-label">Best:</div>
          <div className="score">
            {bestScore}/{orderedBonds.length}
          </div>
        </div>
      </header>

      <p className="instructions">
        Can you guess all the James Bond movies in chronological order?
      </p>

      <div className="controls-container">
        <button className="control" onClick={restart}>
          Restart
        </button>
        <button className="control" onClick={() => setNeedsShuffling(true)}>
          Shuffle
        </button>
        <button className="control" onClick={revealAnswers}>
          Reveal
        </button>
        <button className="control" onClick={() => setBestScore(score)}>
          Clear Best
        </button>
      </div>

      <section>
        <BondGrid
          isGuessedGrid={false}
          bondArray={unguessedBonds}
          handleGuess={guessBond}
          includeNonEon={includeNonEon}
          toggleEon={toggleEon}
        />
        <BondGrid
          isGuessedGrid={true}
          bondArray={guessedBonds}
          orderedBonds={orderedBonds}
        />
      </section>

      <GameOverBanner winOrLose={winOrLose} />

      <Footer />

      {/* <h2>Correct order:</h2>
      {orderedBonds.map((bond) => {
        return <div key={`ordered-${bond.id}`}>{bond.title}</div>;
      })} */}
    </div>
  );
};

export default App;
