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

  receiveAttack(entry) {
    const attackedCell = this.board[entry];
    attackedCell.isHit = true;
    if (attackedCell.hasShip) {
      attackedCell.hasShip.hit(entry);
      attackedCell.hasShip?.isSunk();
    }
    // ADD LOGIC WHEN SUNKED
  }

  checkIfAllShipAreSunk() {
    const shipsArr = this.board.filter((cell) => cell.hasShip);
    return shipsArr.every((ship) => ship.hasShip.sunk);
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
