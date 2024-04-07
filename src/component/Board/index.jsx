import React, { useState, useEffect } from "react";
import "./index.css";

const Board = ({
  numOfRows = 10,
  numOfCols = 10,
  diceValue,
  setDice,
  numOfDuplicateDiceThrows = 0,
  playerTurn,
}) => {
  const [player1Position, setPlayer1Position] = useState({ row: 0, col: 0 });

  const [player2Position, setPlayer2Position] = useState({ row: 0, col: 0 });

  const [ladderOne, setLadderOne] = useState({
    head: { row: 0, col: 1 },
    tail: { row: 2, col: 4 },
  });

  const [ladderTwo, setLadderTwo] = useState({
    head: { row: 4, col: 6 },
    tail: { row: 6, col: 5 },
  });

  const [snakeOne, setSnakeOne] = useState({
    head: { row: 3, col: 6 },
    tail: { row: 1, col: 1 },
  });

  const [snakeTwo, setSnakeTwo] = useState({
    head: { row: 7, col: 6 },
    tail: { row: 4, col: 4 },
  });

  useEffect(() => {
    //ladderone
    if (
      player1Position.row === ladderOne.head.row &&
      player1Position.col === ladderOne.head.col
    ) {
      setPlayer1Position(ladderOne.tail);
      return;
    }
    // laddertwo

    if (
      player1Position.row === ladderTwo.head.row &&
      player1Position.col === ladderTwo.head.col
    ) {
      setPlayer1Position(ladderTwo.tail);
      return;
    }

    //snakeOne
    if (
      player1Position.row === snakeOne.head.row &&
      player1Position.col === snakeOne.head.col
    ) {
      setPlayer1Position(snakeOne.tail);
      return;
    }
    //snakeTwo
    if (
      player1Position.row === snakeTwo.head.row &&
      player1Position.col === snakeTwo.head.col
    ) {
      setPlayer1Position(snakeTwo.tail);
      return;
    }
  }, [player1Position, ladderOne, ladderTwo, snakeOne, snakeTwo]);

  //player 2 useeffect
  useEffect(() => {
    //ladderone 
    if (
      player2Position.row === ladderOne.head.row &&
      player2Position.col === ladderOne.head.col
    ) {
      setPlayer2Position(ladderOne.tail);
      return;
    }
    // laddertwo

    if (
      player2Position.row === ladderTwo.head.row &&
      player2Position.col === ladderTwo.head.col
    ) {
      setPlayer2Position(ladderTwo.tail);
      return;
    }

    //snakeOne
    if (
      player2Position.row === snakeOne.head.row &&
      player2Position.col === snakeOne.head.col
    ) {
      setPlayer2Position(snakeOne.tail);
      return;
    }
    //snakeTwo
    if (
      player2Position.row === snakeTwo.head.row &&
      player2Position.col === snakeTwo.head.col
    ) {
      setPlayer2Position(snakeTwo.tail);
      return;
    }
  }, [player2Position, ladderOne, ladderTwo, snakeOne, snakeTwo]);


  const updatePlayerPosition = (prevPoss) => {
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
  };
  
  useEffect(() => {
    if (diceValue === 0) {
      return;
    }
    if (playerTurn === 0) {
      setPlayer1Position(updatePlayerPosition);
    } else {
      setPlayer2Position(updatePlayerPosition);
    }
    console.log(diceValue);
  }, [diceValue, numOfDuplicateDiceThrows,playerTurn]);
  const board = [...Array(numOfRows).keys()].map((row) => {
    return [...Array(numOfCols).keys()].map((col) => {
      return row * numOfCols + col;
    });
  });

  console.log(player1Position);

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
                    className={`board__col 
                    ${isFirstRow ? "board__col--border-bottom" : ""} 
                    ${isFirstCol ? "board__col--border-left" : ""} 
                    ${
                      player1Position.row === rowIdx && //player1
                      player1Position.col === colIdx
                        ? "board__col--player1"
                        : ""
                    }
                    ${
                      player2Position.row === rowIdx && //player2
                      player2Position.col === colIdx
                        ? "board__col--player2"
                        : ""
                    }
                  
                    ${
                      ladderOne.head.row === rowIdx && //ladder one head
                      ladderOne.head.col === colIdx
                        ? "board__col--ladder-one-head"
                        : ""
                    }
                    
                    ${
                      ladderOne.tail.row === rowIdx && //ladder one tail
                      ladderOne.tail.col === colIdx
                        ? "board__col--ladder-one-tail"
                        : ""
                    }
                    ${
                      ladderTwo.head.row === rowIdx && //ladder two head
                      ladderTwo.head.col === colIdx
                        ? "board__col--ladder-two-head"
                        : ""
                    }
                    ${
                      ladderTwo.tail.row === rowIdx && //ladder two tail
                      ladderTwo.tail.col === colIdx
                        ? "board__col--ladder-two-tail"
                        : ""
                    }
                    ${
                      snakeOne.head.row === rowIdx && //snakeOne head
                      snakeOne.head.col === colIdx
                        ? "board__col--snake-one-head"
                        : ""
                    }
                    ${
                      snakeOne.tail.row === rowIdx && //snake one tail
                      snakeOne.tail.col === colIdx
                        ? "board__col--snake-one-tail"
                        : ""
                    }
                    ${
                      snakeTwo.head.row === rowIdx && //snake two head
                      snakeTwo.head.col === colIdx
                        ? "board__col--snake-two-head"
                        : ""
                    }
                    ${
                      snakeTwo.tail.row === rowIdx && //snake two tail
                      snakeTwo.tail.col === colIdx
                        ? "board__col--snake-two-tail"
                        : ""
                    }
                    `}
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
