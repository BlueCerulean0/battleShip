import { Ship } from "./ship.js";

export class GameBoard {
  constructor() {
    this.ships = new Map();
    this.used = new Map();
    this.hit = new Map();
    this.miss = new Map();
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

    for (let element of locationInbetween) {
      
      if (this.used.has(element.toString())) {
        
        console.error('location occupied');
        return false;

      } 

      
    };
    
    for (let element of locationInbetween) {
      
      this.used.set(element.toString(), length);
    }

    this.ships.set(length.toString(), new Ship(length, locationInbetween));
    return true;
  }

  hitOrMiss(location) {
    
    if (this.used.has(location.toString())) {
      
      const key = this.used.get(location.toString())
      let theShip = this.ships.get(key.toString())
      
      if (!this.hit.has(location.toString())) {

        theShip.incrementHit();
        this.hit.set(location.toString(), location);
      }
      
      if (theShip.returnLen() === theShip.returnHit()) {

        theShip.sinkTheShip();
      }
      return true;

    } else if (this.miss.has(location.toString())) return false;
    

    this.miss.set(location.toString(),location)
    return false
  }

  returnMissed() {
    if (this.miss) {
      
      let eachMissed = [];
      this.miss.forEach((value) => {

        eachMissed.push(value);
      });
      
      return eachMissed;
    }
  }

  returnHit() {
    if (this.hit) {
      
      let eachHit = [];
      this.hit.forEach((value) => {

        eachHit.push(value);
      });
      
      return eachHit;
    }
  }
  
  returnUsed() {

    if (this.used) {
      
      let eachUsed = [];
      this.used.forEach((value, key) => {

        eachUsed.push(key);
      });
      
      return eachUsed;
    }
  
  }
}
