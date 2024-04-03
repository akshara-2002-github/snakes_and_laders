import { useState } from "react";
import "./App.css";
import Board from "./component/Board";
import Dice from "./component/Dice";

function App() {
  const [dice, setDice] = useState(0);
  const onDiceClick = () => {
    setDice(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div>
      <Board diceValue={dice} setDice={setDice} />
      <Dice  onClick={onDiceClick} />
    </div>
  );
}

export default App;
