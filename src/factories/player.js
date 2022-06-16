import gameBoard from "./gameBoard";
import typeOfShips from "../helpers/typeOfShips";
import Ship from "./ship";

class Player {
  constructor(status = true) {
    this.status = status;
    this.gameBoard = new gameBoard();
  }
  receive(coord) {
    this.gameBoard.receiveAttack(coord);
  }
}
export default Player;
