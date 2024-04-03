import React, { useState, useEffect } from "react";
import "./index.css";

const Board = ({ numOfRows = 5, numOfCols = 5, diceValue, setDice }) => {
  const [playerPosition, setPlayerPosition] = useState({ row: 0, col: 0 });
  //   const [player1Poss, updatePlayer1Poss] = useState([0, 0]);

  // const handeBtnClick = () => {
  //     updatePlayer1Poss(prevPoss => {
  //         const [rowIdx, colIdx] = prevPoss;
  //         const isColIdxMax = colIdx ==== (numOfCols - 1);
  //         if (isColIdxMax) {
  //             const isRowIdxMax = rowIdx === (nowOfRow - 1);
  //             if (isRowIdxMax) return prevPoss;
  //             return [rowIdx + 1, 0];
  //         }
  //         return [rowIdx, colIdx + 1];
  //     });
  // };

  useEffect(() => {
    if (diceValue === 0) {
      return;
    }
    setPlayerPosition((prevState) => {
      const newCol = prevState.col + diceValue;
      const isNewColInvalid = newCol >= numOfCols;
      if (!isNewColInvalid) {
        return {
          row: prevState.row,
          col: newCol,
        };
      }
      const newRow = prevState.row + 1;
      const isNewRowInvalid = newRow > numOfRows - 1;
      if (isNewRowInvalid) {
        return prevState;
      }
      return {
        row: newRow,
        col: diceValue - (numOfCols - prevState.col - 1) + 1,
      };
    });
    console.log(diceValue);
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
