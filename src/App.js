import React, { useEffect, useState } from "react";
import "./styles.scss";

export default function App() {
  const [grid, setGrid] = useState([]);
  const [level, setLevel] = useState(3);
  const [isColor, setIsColor] = useState(true);
  const [totalGuess, setTotalGuess] = useState(0);
  const [guessedBoxes, setGuessedBoxes] = useState([]);

  // generate guesses and update grid values
  const generateGuess = () => {
    let count = level;
    while (count > 0) {
      let randomI = Math.floor(Math.random() * level);
      let randomJ = Math.floor(Math.random() * level);
      let guessedIJ = `${randomI}, ${randomJ}`;
      // re-generate random if alredy guessed.
      // if (guessedBoxes[guessedIJ]) {
      //   console.log("already", guessedBoxes);
      // }
      console.log("guessedIJ", guessedIJ);
      guessedBoxes[guessedIJ] = true;
      count--;
    }

    Object.keys(guessedBoxes).length <= level &&
      Object.keys(guessedBoxes).forEach((k, _v) => {
        const [i, j] = k.split(",");
        grid.forEach((_row, rowI) => {
          grid[rowI].forEach((_col, colI) => {
            if (rowI === parseInt(i, 10) && colI === parseInt(j, 10)) {
              grid[rowI][colI] = 1;
            }
          });
        });
      });

    setGrid([...grid]);

    setTimeout(() => {
      setIsColor(false);
    }, 3000);
  };

  // Reset blue color to gray after 1 second
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsColor(false);
  //   }, 3000);
  // }, [Object.keys(guessedBoxes).length]);

  // start guess
  const startGuess = (e, cell) => {
    // console.log(totalGuess, "Cell", cell);
    if (cell === 1) {
      e.target.style?.setProperty("background-color", "green");
    }
    if (cell === 0) {
      e.target.style?.setProperty("background-color", "red");
    }
    setTotalGuess(totalGuess - 1);
  };

  // update grid based on difficulty level
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < level; i++) {
      arr.push([]);
      for (let j = 0; j < level; j++) {
        arr[i][j] = 0;
      }
    }
    setGrid(arr);

    setTotalGuess(level * level);

    // update css variable
    const root = document.documentElement;
    root?.style.setProperty("--grid-repeat-number", level);
  }, [level]);

  // console.log(rightGuess, "Guess", guessedBoxes);
  return (
    <div className="memory-game">
      <div className="button-div">
        <h1>Memory Game</h1>
        <input
          min="2"
          max="10"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          type="range"
          data-range
        />
        <div>
          <button
            data-play-btn
            // disabled={totalGuess === 0 || totalGuess < level * level}
            onClick={generateGuess}
          >
            Play
          </button>
          {totalGuess === level * level && <span>Start Guess now!</span>}
          {totalGuess === 0 && <span>Game Over! Start Again.</span>}
        </div>
      </div>
      <div className="grid-container">
        {grid.map((row, rowIdx) => {
          return grid[rowIdx].map((col, colIdx) => {
            const cell = grid[rowIdx][colIdx];
            return (
              <div
                key={`${rowIdx}${colIdx}`}
                className={
                  cell === 1 && isColor ? "grid-boxes blue" : "grid-boxes gray"
                }
                onClick={(e) => startGuess(e, cell)}
              >
                <span>{cell}</span>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
