import Player from "./player";
import gameBoard from "./gameBoard";

class AI extends Player {
  constructor(status) {
    super(status, gameBoard);
  }
}
export default AI;
