class Ship {
  constructor(length, coords) {
    this.length = length;
    this.coords = coords;
    this.hits = [];
  }

  hit(hitCoord) {
    this.hits.push(hitCoord);
  }
}

export default Ship;
