import React from "react";
import "./main.scss";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const { width, height } = useWindowSize();

  const allEqual = dice.every((item) => item.value === dice[0].value);
  const allHeld = dice.every((item) => item.isHeld);

  React.useEffect(() => {
    if (allEqual && allHeld) {
      console.log("You won");
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies === false) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
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
    <div>
      {tenzies && <Confetti width={width} height={height} />}
      <div className="page-container">
        <div className="first-background">
          <div className="second-background">
            <h1 className="title">Tenzies</h1>
            <p className="title-paragraph">
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </p>
            <div className=" grid-container">{diceElements}</div>
            <button className="roll-btn" onClick={rollDice}>
              {tenzies ? "New Game" : "Roll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
