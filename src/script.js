import './css/style.css';
//import { Ship } from './ship.js';
import { GameBoard } from './gameBoard.js'
import { Player } from './player.js';

const container = document.getElementById('container');
const player = document.querySelector('.player');
const computer = document.querySelector('.computer');


let allLocation = [];

for (let y = 0; y < 8; y++) {

  for (let x = 0; x < 8; x++) {
    allLocation.push([x,y].toString());
  }
}

for (let i = 0; i < 64; i++) {
  
  const button = document.createElement("button");
  button.classList.add(allLocation[i])
  player.append(button);

  const button2 = document.createElement("button");
  button2.classList.add(allLocation[i])
  computer.append(button2);
  
}

computer.style.display = "none";
const instruction = document.createElement('h1');
instruction.textContent = "Place your ships!";
container.append(instruction);

let player1 = new Player("Roy");

let shipCounter = 0;
console.log("shipCounter: " + shipCounter)

const handleShips = (event) => {
  
  if (event.target.matches('button')) {

    const locClass = event.target.classList.toString();
    let locClassArr = [];
    locClassArr.push(parseInt(locClass[0]));
    locClassArr.push(parseInt(locClass[2]));
    
    console.log("Clicked on: " + locClassArr)
    let placed = player1.makeShip(shipCounter, locClassArr);
    
    if (placed) {
      shipCounter++;
      const usedLoc = player1.used
      console.log("Used loc is: " + usedLoc)

      for (let element of usedLoc) {
        let theButton = document.getElementsByClassName(element);

        theButton[0].classList.add("placed");
      
      }

      if (shipCounter >= 4) {
        player.removeEventListener("click", handleShips)
        const start = document.createElement("button");
        container.removeChild(instruction);
        start.textContent = "Start";
        start.classList.add("start");
        container.append(start);
        console.log("event removed")
      }
    }
  }

}

player.addEventListener('click', handleShips)





// let game = new GameBoard;

// console.log(game)

// game.placeShip(2, [1,0])

// console.log(game)

// game.placeShip(1, [0,0])
// game.placeShip(1, [0,1])
// console.log(game)
