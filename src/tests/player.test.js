import Player from "../factories/player";
import gameBoard from "../factories/gameBoard";

jest.mock("../factories/gameBoard");

beforeEach(() => {
  gameBoard.mockClear();
});

describe("Player ()", () => {
  let testPlayer;
  beforeEach(() => {
    testPlayer = new Player();
  });

  it("expect gameBoard to have been instantied when a new player is created", () => {
    expect(gameBoard).toHaveBeenCalledTimes(1);
  });
  it("expect receiveAttack method on gameBoard to be called when opponent attack a coord", () => {
    let spy = jest.spyOn(gameBoard.prototype, "receiveAttack");
    const attacked = 2;
    testPlayer.receive(2);
    expect(gameBoard).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(attacked);
  });
});
