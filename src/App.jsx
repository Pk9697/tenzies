import React from "react";
import Die from "./Die";
function App() {
  const [dice, setDice] = React.useState(allNewDice())


  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  function rollDice() {
      setDice(allNewDice())
  }

  const diceElements = dice.map((die,index) => <Die key={index} value={die} />)

  return (
    <div className="app-container">
      <div className="app">
        <div className="dice-container">
          {diceElements}
        </div>
        <button className="roll-dice" onClick={rollDice}>Roll</button>
      </div>
    </div>
  );
}

export default App;
