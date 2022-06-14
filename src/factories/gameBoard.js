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
    for (let i = 1; i <= 100; i++) {
      board.push({ cell: i, hasShip: false, isHit: false });
    }
    return board;
  }

  placeShip(entry, ship) {
    //id, length, coords
    try {
      const { id, length } = ship;
      const coords = this._getShipCoords(entry, length);
      this._checkPlacingCoords(coords);
      const newShip = new Ship(id, length, coords);
      this._addShipInBoard(coords, newShip);
      this.shipsInBoard.push(newShip);
    } catch (error) {
      throw error;
    }
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
    coords.forEach((coord) => (this.board[coord - 1].hasShip = ship));
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

  _checkPlacingCoords(coords) {
    let canPlaceCoords;
    //Check if coords are inside row
    if (this.dir === "h") {
      const min = Math.floor(coords[0] / 10) + "1";
      const max = Math.floor(coords[0] / 10 + 1) + "0";
      canPlaceCoords = coords.every((coord) => coord >= min && coord <= max);
    } else if (this.dir === "v") {
      canPlaceCoords = coords.every((coord) => coord <= 100);
    }
    //check if ship collides
    const checkIfCollide = coords.every((coord) => !this.board[coord]?.hasShip);

    return this._isPlacementPossible(checkIfCollide, canPlaceCoords);
  }

  _isPlacementPossible(noCollision, insideTable) {
    if (!noCollision || !insideTable) {
      throw new Error("can't place ship");
    }
    return true;
  }

  tweakDirection() {
    return (this.dir = this.dir === "h" ? "v" : "h");
  }
}
export default gameBoard;
