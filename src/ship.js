export class Ship {

  constructor(length, width=null, hitCount=0, sunk=false) {

    this.length = length
    this.hitCount = hitCount
    this.sunk = sunk
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
    if (this.inRange) return this.inRange
  }

  incrementHit() {
    this.hitCount++;
    if (this.hitCount === this.length) this.sunk = true;
  }
}


