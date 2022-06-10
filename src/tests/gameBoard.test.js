import gameBoard from "../factories/gameBoard";
import Ship from "../factories/ship";
import typeOfShips from "../helpers/typeOfShips";

jest.mock("../factories/ship");

let testBoard;
beforeEach(() => (testBoard = new gameBoard()));
it("create array when instance of gameBoard is created", () => {
  expect(testBoard.board).toHaveLength(100);
});
describe("placeShip()", () => {
  it("place ship given an entry and ship id (horizontal)", () => {
    const entry = 2;
    const { id, length } = typeOfShips[2];
    const coords = [2, 3, 4];
    testBoard.placeShip(entry, typeOfShips[2]);

    expect(Ship).toHaveBeenCalledWith(id, length, coords);
  });

  it("place ship given an entry and ship id (vertical)", () => {
    testBoard.tweakDirection();
    const entry = 2;
    const { id, length } = typeOfShips[2];
    const coords = [2, 12, 22];
    testBoard.placeShip(entry, typeOfShips[2]);

    expect(Ship).toHaveBeenCalledWith(id, length, coords);
  });

  it("add ship to shipsInBoard array", () => {
    testBoard.tweakDirection();
    const entry = 2;
    testBoard.placeShip(entry, typeOfShips[2]);

    expect(testBoard.shipsInBoard).toHaveLength(1);
  });

  it("add ship in board at ship's coords", () => {
    const entry = 2;
    testBoard.placeShip(entry, typeOfShips[2]);

    expect(testBoard.board[2].hasShip).not.toBeFalsy();
    expect(testBoard.board[3].hasShip).not.toBeFalsy();
    expect(testBoard.board[4].hasShip).not.toBeFalsy();
    expect(testBoard.board[5].hasShip).toBeFalsy();
  });
});
