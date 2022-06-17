import gameBoard from "../factories/gameBoard";
import AI from "../factories/AI";
import typeOfShips from "../helpers/typeOfShips";

jest.mock("../factories/gameBoard");

beforeEach(() => {
  gameBoard.mockClear();
});

describe("Player ()", () => {
  let testAI;
  beforeEach(() => {
    testAI = new AI(false);
  });

  it("expect gameBoard to have been instantied when a new player is created", () => {
    expect(gameBoard).toHaveBeenCalledTimes(1);
  });
  it("expect receiveAttack method on gameBoard to be called when opponent attack a coord", () => {
    let spy = jest.spyOn(gameBoard.prototype, "receiveAttack");
    const attacked = 2;
    testAI.receive(2);
    expect(gameBoard).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(attacked);
  });
  it("expect to switch status to false when called (default true)", () => {
    testAI.switchStatus();
    expect(testAI.status).toBe(true);
  });

  it("expect to switch status to false when called (set false)", () => {
    testAI.switchStatus();
    testAI.switchStatus();

    expect(testAI.status).toBe(false);
  });

  describe("placeRandomShips", () => {
    it("place 5 ships on gameBoard automatically", () => {
      testAI.placeRandomShips();
      let spy = jest.spyOn(gameBoard.prototype, "placeShip");
      expect(spy).toHaveBeenCalled();
    });
  });
});
