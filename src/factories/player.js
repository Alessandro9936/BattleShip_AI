import gameBoard from "./gameBoard";

class Player {
  constructor(status = true) {
    this.status = status;
    this.gameBoard = new gameBoard();
  }
  receive(coord) {
    this.gameBoard.receiveAttack(coord);
  }
  switchStatus() {
    return (this.status = this.status === true ? false : true);
  }
}
export default Player;
