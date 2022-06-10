class Ship {
  constructor(id, length, coords) {
    this.id = id;
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
