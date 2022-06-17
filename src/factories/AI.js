import Player from "./player";
import gameBoard from "./gameBoard";
import typeOfShips from "../helpers/typeOfShips";

class AI extends Player {
  constructor(status) {
    super(status, gameBoard);
  }

  placeRandomShips() {
    typeOfShips.forEach((ship) => {
      const randomEntry = this._generateRandomNumber();
      this._generateShip(randomEntry, ship);
      this.gameBoard.tweakDirection();
    });
  }

  _generateShip(entry, ship) {
    try {
      this.gameBoard.placeShip(entry, ship);
    } catch {
      if (this.gameBoard.shipsInBoard.includes(ship)) return;
      this._generateShip(this._generateRandomNumber(), ship);
    }
  }

  _generateRandomNumber() {
    return Math.floor(Math.random() * 100 + 1);
  }
}

export default AI;
