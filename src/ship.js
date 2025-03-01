export class Ship {

  constructor(length, width=[]) {

    this.length = length
    this.hitCount = 0
    this.sunk = false
    this.width = width
  }

  returnLen() {
    return this.length
  }
  returnHit() {
    return this.hitCount;
  }
  isSunk() {
    if (this.sunk === true) {
      return true;
    } else return false;
  }
  returnRange() {
    if (this.width) return this.width;
  }

  incrementHit() {
    this.hitCount++;
    if (this.hitCount === this.length) this.sunk = true;
  }
  sinkTheShip() {
    this.sunk = true;
  }

}


