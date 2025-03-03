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

const player1 = new Player("Roy");

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

container.addEventListener('click', (event) => {
  
  if (event.target.classList.contains('start')) {
    
    container.removeChild(event.target);
    computer.style.display = 'grid'
  }
})


const playerCom = new Player("Computer");
playerCom.placeRan(4);



function gameLoop(event) {
  if (event.target.matches("button")) {
    
    const locClass = event.target.classList.toString();
    let locClassArr = [];
    locClassArr.push(parseInt(locClass[0]));
    locClassArr.push(parseInt(locClass[2]));

    const attacked = playerCom.reciveAttack(locClassArr);
    
    if (attacked) {

      event.target.classList.add('hit');
      return
    }

    event.target.classList.add('miss');
  }
  
  attackPlyaer()


  if (player1.gameOver) {
    const winPop = document.querySelector('.winPop');
    const msg = document.createElement('p');
    msg.textContent = "COMPUTER WINS"
    winPop.prepend(msg);
    winPop.classList.add('winPopOpen')
    
    computer.removeEventListener("click", gameLoop)
  } else if (playerCom.gameOver) {
    
    const winPop = document.querySelector('.winPop');
    const msg = document.createElement('p');
    msg.textContent = "Player Wins!"
    winPop.prepend(msg);
    winPop.classList.add('winPopOpen')
    computer.removeEventListener("click", gameLoop)
  }

}

computer.addEventListener("click", gameLoop)

function attackPlyaer() {

  const ranPlayerLoc = player1.gameBoard.genRanLoc();
  const attacked = player1.reciveAttack(ranPlayerLoc);
  
  const theButton = document.getElementsByClassName(ranPlayerLoc.toString());

  if (attacked) {  
    theButton[0].classList.add('playerHit');
    return;
  }
  
  theButton[0].classList.add('playerMiss');
 
}
