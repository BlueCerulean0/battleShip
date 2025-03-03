import { GameBoard } from "./gameBoard.js";


export class Player {

  constructor(name) {
    this.player = name;
    this.playerShips = [];
    this.gameBoard = new GameBoard; 
    this.used = null;
    this.missed = null;
    this.hit = null;
    
    this.gameOver = false;
  }
  
  reciveAttack(location) {
    const hitOrMissBool = this.gameBoard.hitOrMiss(location);
    if (!hitOrMissBool) {
      this.missed = this.gameBoard.returnMissed();

      return false 
    }
    this.hit = this.gameBoard.returnHit();
    if (this.hit.length === this.used.length) this.gameOver = true;


    return true;
  }
  
  makeShip(length, location) {
    
    const placed = this.gameBoard.placeShip(length, location);

    if (!placed) return false;
    
    this.used = this.gameBoard.returnUsed();
    return true;
  }  
  
  placeRan(ammount) {
    this.gameBoard.placeRandom(ammount);
    this.used = this.gameBoard.returnUsed();
  }
}


