import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  /**
   * Challenge: Count the number of rolls and display it beside Roll
   */
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [countRolls, setCountRolls] = React.useState(0);
  const [timeTaken, setTimeTaken] = React.useState(Date.now());
  const [personalBest, setPersonalBest] = React.useState(() =>
    generateInitialBest()
  );
  const [personalBestFlag, setPersonalBestFlag] = React.useState(false);

  function generateInitialBest() {
    if (localStorage.getItem("best") == undefined) {
      return 200;
    } else {
      // console.log(JSON.parse(localStorage.getItem("best")));
      return JSON.parse(localStorage.getItem("best"));
    }
  }
  // localStorage.removeItem("best");
  //using fxn to call generateInitialBest cos its expensive to be re rendered again and again Lazy Initialization concept

  React.useEffect(
    function () {
      const allHeld = dice.every((die) => die.isHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every((die) => die.value === firstValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
        let date = Date.now();
        let time = (date - timeTaken) / 1000;
        setTimeTaken((prevTime) => date - prevTime);
        // console.log(time);
        // console.log(personalBest);
        if (time < personalBest) {
          setPersonalBestFlag(true);
          // console.log("Hurray you have beaten your personal best");
          localStorage.setItem("best", JSON.stringify(time));
          setPersonalBest(time);
        }
      }
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
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setCountRolls((prevCount) => prevCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCountRolls(0);
      setTimeTaken(Date.now());
      setPersonalBestFlag(false);
    }
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
        <div className="count-rolls">Rolls: {countRolls}</div>
        {tenzies && (
          <div className="count-rolls">Time Taken: {timeTaken / 1000} s</div>
        )}
        <div className="count-rolls">Personal Best: {personalBest} s</div>
        {personalBestFlag && (
          <div>Hurray you have beaten your personal best</div>
        )}
      </div>
    </div>
  );
}

export default App;
