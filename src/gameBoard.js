import { Ship } from "./ship.js";

export class GameBoard {
  constructor() {
    this.ships = new Map();
    this.used = new Map();
    this.hit = new Set();
  }
  
  inBetween(start, end) {
  
    let inside = [];
    for (let i = start[0]; i <= end[0]; i++) {

      inside.push([i, start[1]])
    }
    return inside;
  }

  placeShip(length, location) {
    
    let startToEnd = [location, [location[0] + length, location[1]]];
    if (
      startToEnd[0][0] > 7 || startToEnd[0][0] < 0 ||
      startToEnd[0][1] > 7 || startToEnd[0][1] < 0 ||

      startToEnd[1][0] > 7 || startToEnd[1][0] < 0 ||
      startToEnd[1][1] > 7 || startToEnd[1][1] < 0   
    ) {
      console.error("Location out of bounds");
      return;
    }
  
    let locationInbetween = this.inBetween(startToEnd[0], startToEnd[1])

    locationInbetween.forEach((element) => {
      
      if (this.used.has(element.toString())) {
        
        console.error('location occupied');
        return;

      } else {

        this.used.set(element.toString(), length);
      }
    });

    this.ships.set(length.toString(), new Ship(length, locationInbetween)); 
  }


  hitOrMiss(location) {
    
    if (this.used.has(location.toString())) {
      
      const key = this.used.get(location.toString()) 
      let theShip = this.ships.get(key.toString())
      
      if (!this.hit.has(location.toString())) {

        theShip.incrementHit();
        this.hit.add(location.toString());
      }
      
      if (theShip.returnLen() === theShip.returnHit()) {

        theShip.sinkTheShip();
      }
      return true;
    }
    
    return false
  }

}
