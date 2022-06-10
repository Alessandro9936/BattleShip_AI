import typeOfShips from "../helpers/typeOfShips";
import Ship from "./ship";

class gameBoard {
  constructor() {
    this.board = this.createGameBoard();
    this.dir = "h";
    this.shipsInBoard = [];
  }

  createGameBoard() {
    const board = [];
    for (let i = 0; i < 100; i++) {
      board.push({ cell: i, hasShip: false, isHit: false });
    }
    return board;
  }

  placeShip(entry, ship) {
    //id, length, coords
    const { id, length } = ship;
    const coords = this._getShipCoords(entry, length);
    const newShip = new Ship(id, length, coords);
    this.shipsInBoard.push(newShip);
    this._addShipInBoard(coords, newShip);
  }

  _addShipInBoard(coords, ship) {
    coords.forEach((coord) => (this.board[coord].hasShip = ship));
  }

  _getShipCoords(entry, length) {
    const coords = [];
    if (this.dir === "h") {
      for (let i = 0; i < length; i++) {
        coords.push(entry + i);
      }
    } else if (this.dir === "v") {
      for (let i = 0; i < length; i++) {
        coords.push(entry + i * 10);
      }
    }
    return coords;
  }

  tweakDirection() {
    return (this.dir = this.dir === "h" ? "v" : "h");
  }
}
export default gameBoard;
