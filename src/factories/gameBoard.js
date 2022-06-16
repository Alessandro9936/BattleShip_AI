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
      const { id, length, shipCoords } = this._getShipProperties(entry, ship);
      console.log(shipCoords);
      this._checkCoords(shipCoords);
      const newShip = this._createShip(id, length, shipCoords);
      this._addShipInBoard(shipCoords, newShip);
      this.shipsInBoard.push(newShip);
    } catch (error) {
      throw error;
    }
  }

  receiveAttack(entry) {
    try {
      const attackedCell = this.board[entry - 1];
      this._checkIfAttackIsValid(attackedCell);
      attackedCell.isHit = true;
      if (attackedCell.hasShip) {
        attackedCell.hasShip.hit(entry);
        attackedCell.hasShip?.isSunk();
      }
      // ADD LOGIC WHEN SUNKED}
    } catch (error) {
      throw error;
    }
  }
  _checkIfAttackIsValid(attackedCell) {
    if (attackedCell.isHit) throw new Error("Can't hit coord multiple times");
  }

  checkIfAllShipAreSunk() {
    const shipsArr = this.board.filter((cell) => cell.hasShip);
    return shipsArr.every((ship) => ship.hasShip.sunk);
  }

  _getShipProperties(entry, ship) {
    const { id, length } = ship;
    const shipCoords = this._getShipCoords(entry, length);
    return { id, length, shipCoords };
  }

  _getShipCoords(entry, length) {
    const shipCoords = [];
    if (this.dir === "h") {
      for (let i = 0; i < length; i++) {
        shipCoords.push(entry + i);
      }
    } else if (this.dir === "v") {
      for (let i = 0; i < length; i++) {
        shipCoords.push(entry + i * 10);
      }
    }
    return shipCoords;
  }

  _checkCoords(shipCoords) {
    //Check is shipCoords are inside gameBoard
    const canPlaceCoords =
      this.dir === "h"
        ? this._horizontalCoordsCheck(shipCoords)
        : this._verticalCoordsCheck(shipCoords);
    //check if ship collides
    const checkIfShipsCollide = shipCoords.every(
      (coord) => !this.board[coord - 1]?.hasShip
    );

    return this._isPlacementPossible(checkIfShipsCollide, canPlaceCoords);
  }

  _horizontalCoordsCheck(shipCoords) {
    const min = Math.floor(shipCoords[0] / 10) + "1";
    const max = Math.floor(shipCoords[0] / 10 + 1) + "0";
    return shipCoords.every((coord) => coord >= min && coord <= max);
  }

  _verticalCoordsCheck(shipCoords) {
    return shipCoords.every((coord) => coord <= 100);
  }

  _isPlacementPossible(noCollision, insideTable) {
    if (!noCollision || !insideTable) {
      throw new Error("can't place ship");
    }
    return true;
  }

  _createShip(id, length, shipCoords) {
    const newShip = new Ship(id, length, shipCoords);
    return newShip;
  }

  _addShipInBoard(shipCoords, ship) {
    shipCoords.forEach((coord) => (this.board[coord - 1].hasShip = ship));
  }

  tweakDirection() {
    return (this.dir = this.dir === "h" ? "v" : "h");
  }
}
export default gameBoard;
