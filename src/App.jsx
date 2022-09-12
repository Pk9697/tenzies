import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  /**
   * Challenge: Tie off loose ends!
   * 1. If tenzies is true, Change the button text to "New Game"
   * 2. If tenzies is true, use the "react-confetti" package to
   *    render the <Confetti /> component 🎉
   *
   *    Hint: don't worry about the `height` and `width` props
   *    it mentions in the documentation.
   */
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(
    function () {
      const allHeld = dice.every((die) => die.isHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every((die) => die.value === firstValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
        // console.log("You won!");
      }
      // let win = true;
      // let checkDie = dice[0].value;
      // for (let i = 0; i < dice.length; i++) {
      //   let die = dice[i];
      //   if (!die.isHeld || die.value != checkDie) {
      //     win = false;
      //     break;
      //   }
      // }
      // setTenzies(win);
    },
    [dice]
  );

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="app-container">
      <div className="app">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
