import { Ship } from "./ship.js";

class GameBoard {
  constructor() {
    this.ships = new Map();
    this.used = new Set();
  }
  
  inBetween(start=[0,0], end=[5,0]) {
  
    let inside = [];
    for (let i = start[0]; i <= end[0]; i++) {

      inside.push([i + 1, start[1]])
    }
    return inside;
  }

  placeShip(length, location=[0,0]) {
    
    let startToEnd = [location, [location[0] + length, location[1]]];
    if (
      startToEnd[0][0] <= 7 && startToEnd[0][0] >= 0 && 
      startToEnd[0][1] <= 7 && startToEnd[0][1] >= 0 &&
      startToEnd[1][0] <= 7 && startToEnd[1][0] >= 0
    
    ) {
      
      const locationInbetween = this.inBetween(startToEnd[0], startToEnd[1])
      this.ships.set(length.toString(), new Ship(length, locationInbetween));

      locationInbetween.forEach((element) => {
        
        if (this.used.has(element.toString())) {
          
          console.error('location occupied');
          return;
        } else {

          this.used.add(element.toString());
        }
      });
    }

  }
}
