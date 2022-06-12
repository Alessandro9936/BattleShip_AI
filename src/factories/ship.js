class Ship {
  constructor(id, length, coords) {
    this.id = id;
    this.shipLength = length;
    this.coords = coords;
    this.hits = [];
    this.sunk = false;
  }

  hit(hitCoord) {
    this.hits.push(hitCoord);
  }

  isSunk() {
    if (this.shipLength === this.hits.length) {
      this.sunk = true;
      return this.sunk;
    }
    return this.sunk;
  }
}

export default Ship;
