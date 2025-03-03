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
  
  genRanLoc() {
    const ranX = Math.floor(Math.random() * (7 - 0 + 1)) + 0; 
    const ranY = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
      
    const ranLocation = [ranX, ranY];
    return ranLocation;
  }

  placeShip(length, location) {
    
    let startToEnd = [location, [location[0] + length, location[1]]];
    if (
      startToEnd[0][0] > 7 || startToEnd[0][0] < 0 ||
      startToEnd[0][1] > 7 || startToEnd[0][1] < 0 ||

      startToEnd[1][0] > 7 || startToEnd[1][0] < 0 ||
      startToEnd[1][1] > 7 || startToEnd[1][1] < 0   
    ) {
      //console.error("Location out of bounds");
      return;
    }
  
    let locationInbetween = this.inBetween(startToEnd[0], startToEnd[1])

    for (let element of locationInbetween) {
      
      if (this.used.has(element.toString())) {
        
        //console.error('location occupied');
        return false;

      }
    };
    
    for (let element of locationInbetween) {
      
      this.used.set(element.toString(), length);
    }

    this.ships.set(length.toString(), new Ship(length, locationInbetween));
    return true;
  }

  placeRandom(ammount = 4) {
    
    let lenPointer = 0
    while (lenPointer < ammount) { 
    
      const ranLocation = this.genRanLoc();
      let locInside = this.inBetween(ranLocation, [ranLocation[0] + lenPointer, ranLocation[1]]);
      
      console.log(locInside);

      let conflict = false;
      for (let element of locInside) {
        if (this.used.has(element.toString())) {
          conflict = true;
          break;
        };
      }
      if (conflict) {
        console.log("conflict")
        continue;
      }
      
      const conflict2 = this.placeShip(lenPointer, ranLocation)
      if (!conflict2) {
        console.log("conflict2"); 
        continue;
      }
      lenPointer++;
    }
    
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
