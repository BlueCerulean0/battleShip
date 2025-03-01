import './css/style.css';
//import { Ship } from './ship.js';
import { GameBoard } from './gameBoard.js'

let game = new GameBoard();

console.log(game)
game.placeShip(4, [0,0])

game.hitOrMiss([0,0])
game.hitOrMiss([0,0])

game.hitOrMiss([1,0])
game.hitOrMiss([2,0])
game.hitOrMiss([3,0])
game.hitOrMiss([4,0])


console.log(game)
