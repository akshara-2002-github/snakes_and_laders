import React, { useState, useEffect } from "react";
import "./index.css";

const Board = ({ numOfRows = 10, numOfCols = 10, diceValue, setDice }) => {
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });

  useEffect(() => {
    if (diceValue === 0) {
      return;
    }

    setPlayerPosition((prevPoss) => {
      const row = prevPoss.row;
      const col = prevPoss.col;
      // prevents player from going beyong the last row and col i.e tile
      if (row === numOfRows - 1 && col === numOfCols - 1) {
        return prevPoss;
      }

      let newCol = col;
      let newRow = row;

      for (let val = 0; val < diceValue; val++) {
        // if player reached end of the row
        if (newCol + 1 >= numOfCols) {
          // move player to first col
          newCol = 0;
          // if player reached the last row
          //1.resets players position to previous col position
          //2. stops player from going to the out of the board (row is not incresed)
          if (newRow + 1 >= numOfCols) {
            newCol = col;
            break;
          }
          //move player to next row
          newRow = newRow + 1;
          continue;
        }
        // if player is not able to move to the next row and has reached the end of the row than reset player position
        if (newCol + 1 >= numOfCols) {
          break;
        }
        newCol += 1;
      }

      return {
        row: newRow,
        col: newCol,
      };
    });
    console.log(diceValue);
    console.log(playerPosition);
    setDice(0);
  }, [diceValue]);
  const board = [...Array(numOfRows).keys()].map((row) => {
    return [...Array(numOfCols).keys()].map((col) => {
      return row * numOfCols + col;
    });
  });

  console.log(playerPosition);
  return (
    <div className="background">
      <div className="board">
        {board.map((row, rowIdx) => {
          const isEven = rowIdx % 2 === 0;

          return (
            <div
              className={`board__row ${!isEven ? "board__row--reversed" : ""} 
            `}
            >
              {row.map((col, colIdx, array) => {
                const isFirstRow = rowIdx === 0;
                const isFirstCol = isEven
                  ? colIdx === 0
                  : colIdx === array.length - 1;
                return (
                  <div
                    className={`board__col ${
                      isFirstRow ? "board__col--border-bottom" : ""
                    } ${isFirstCol ? "board__col--border-left" : ""} 
                    ${
                      playerPosition.row === rowIdx &&
                      playerPosition.col === colIdx
                        ? "board__col--player"
                        : ""
                    }`}
                  >
                    {col + 1}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;

// setPlayerPosition((prevState) => {
//   const newCol = prevState.col + diceValue;
//   const isNewColInvalid = newCol >= numOfCols;
//   if (!isNewColInvalid) {
//     return {
//       row: prevState.row,
//       col: newCol,
//     };
//   }
//   const newRow = prevState.row + 1;
//   const isNewRowInvalid = newRow > numOfRows - 1;
//   if (isNewRowInvalid) {
//     return prevState;
//   }
//   return {
//     row: newRow,
//     col: diceValue - (newCol - prevState.col)-1
//   };
// });
