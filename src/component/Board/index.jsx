import React from "react";
import "./index.css";

const Board = ({ numOfRows = 10, numOfCols = 10 }) => {
  const board = [...Array(numOfRows).keys()].map((row) => {
    return [...Array(numOfCols).keys()].map((col) => {
      return row * numOfCols + col;
    });
  });
  console.log(board);
  return (
    <div className="board">
      {board.map((row, rowIdx) => {
        const isEven = rowIdx % 2 === 0;

        console.log(rowIdx, isEven);
        return (
          <div
            className={`board__row ${!isEven ? "board__row--reversed" : ""} 
            `}
          >
            {row.map((col, colIdx, array) => {
              const isFirstRow = rowIdx === 0;
              const isFirstCol = isEven ? colIdx === 0: colIdx === array.length - 1;
              return (
                <div
                  className={`board__col ${
                    isFirstRow ? "board__col--border-bottom" : ""
                  } ${isFirstCol ? "board__col--border-left" : ""}`}
                >
                  {col + 1}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
