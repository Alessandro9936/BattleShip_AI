import GameBoard from './gameBoard';

class Player {
  constructor(status = true) {
    this.status = status;
    this.gameBoard = new GameBoard();
  }

  receive(coord) {
    this.gameBoard.receiveAttack(coord);
  }

  switchStatus() {
    return (this.status = !this.status);
  }
}
export default Player;
