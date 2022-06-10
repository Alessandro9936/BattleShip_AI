class Ship {
  constructor(length, coords) {
    this.shipLength = length;
    this.coords = coords;
    this.hits = [];
  }

  hit(hitCoord) {
    this.hits.push(hitCoord);
  }

  isSunk() {
    return this.shipLength === this.hits.length ? true : false;
  }
}

export default Ship;
