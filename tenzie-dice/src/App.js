import React from "react"
import './App.css';
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


function App() {

  // Initialize state varible for dice
  // Will recieve 10 random numbners between 1-6 at first render
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstVal = dice[0].value
    const allSameValue = dice.every(die => die.value === firstVal)

    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log("You Won")
    }
  }, [dice])

  // Function generateNewDie returns a an object with propertis for a new die object
  function generateNewDie(){
    return {
        value: Math.floor(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }
  // Function allNewDice() generates an array of 10 random 
  // numbers between 1-6, saves and array of objects
  
  function allNewDice(){
    const diceArray = []
    for(let i = 0; i<10; i++){
      diceArray.push(generateNewDie())
    }
    console.log()
    return diceArray
}

// function rollDice() calls state variable function setDice
// attached to a click event on button, when clicked will generate
// a new set of 10 random numbers, will not change die with isHeld === true
function rollDice(){
  setDice(prevDice => prevDice.map(die => {
      return die.isHeld ?
             die :
             generateNewDie()
  }))
}

// Funciton holdDice 
function holdDice(id){
  setDice(prevDice => prevDice.map(die => {
        return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
  }))
}

function newGame(){
  setTenzies(false)
  setDice(allNewDice)
}
  // diceElements variable that takes in a mapped aray from state variable dice
  // renders an instance of component Die with value set to one
  // of the randomly generated numbers 
  const diceElements = dice.map(die => 
        <Die key={die.id}value={die.value} 
        isHeld={die.isHeld} 
        holdDice={()=> holdDice(die.id)} 
        />
  )


  return (
    <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
      <div className="dice-container">
           {diceElements}
      </div>
      <button className="roll-button" onClick={()=> tenzies ? newGame() : rollDice()}> {tenzies ? "New Game" : "Roll"} </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
