import Player from './player';
import typeOfShips from '../helpers/typeOfShips';

class AI extends Player {
  constructor(status, gameBoard) {
    super(status, gameBoard);
    this.attackedCoordsArr = Array.from({ length: 100 }, (_, i) => i + 1);
    this.placeRandomShips();
  }

  placeRandomShips() {
    typeOfShips.forEach((ship) => {
      const randomEntry = this._generateRandomNumber(1, 100);
      this._generateShip(randomEntry, ship);
      this.gameBoard.tweakDirection();
    });
  }

  _generateShip(entry, ship) {
    try {
      this.gameBoard.placeShip(entry, ship);
    } catch {
      if (this.gameBoard.shipsInBoard.includes(ship)) return;
      this._generateShip(this._generateRandomNumber(1, 100), ship);
    }
  }

  sendAttack() {
    const index = this._generateRandomNumber(
      0,
      this.attackedCoordsArr.length - 1
    );
    const [attackedCoord] = this.attackedCoordsArr.splice(index, 1);
    return attackedCoord;
  }

  _generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default AI;
