import { useState } from "react";
import "./App.css";
import Board from "./component/Board";
import Dice from "./component/Dice";

function App() {
  const [dice, setDice] = useState(0);
  const [numOfDuplicateDiceThrows, setNumOfDuplicateDiceThrows] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(0);

  const onDiceClick = () => {
    setDice((prevValue) => {
      const newDiceValue = Math.floor(Math.random() * 6) + 1;
      if (prevValue === newDiceValue) {
        setNumOfDuplicateDiceThrows((prev) => prev + 1);
      } else {
        setNumOfDuplicateDiceThrows(0);
      }
      return newDiceValue;
    });

    setPlayerTurn((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div>
      <Board
        numOfDuplicateDiceThrows={numOfDuplicateDiceThrows}
        diceValue={dice}
        setDice={setDice}
        playerTurn={playerTurn}
      />
      <Dice onClick={onDiceClick} diceValue={dice} />
    </div>
  );
}

export default App;
