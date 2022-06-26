import GameBoard from './gameBoard';

class Player {
  constructor(status = true) {
    this.status = status;
    this.gameBoard = new GameBoard();
  }

  switchStatus() {
    return (this.status = !this.status);
  }
}
export default Player;
