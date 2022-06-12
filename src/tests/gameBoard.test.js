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
describe("receiveAttack ()", () => {
  it("check coord in gameBoard to hit if coord is given", () => {
    const entry = 2;
    testBoard.placeShip(entry, typeOfShips[2]);
    const attackedCoord = 2;
    testBoard.receiveAttack(attackedCoord);

    expect(testBoard.board[attackedCoord].isHit).toBe(true);
  });

  it("attacked cell has NOT a ship, check that cell as hitted", () => {
    const entry = 2;
    testBoard.placeShip(entry, typeOfShips[2]);
    const attackedCoord = 9;
    testBoard.receiveAttack(attackedCoord);

    expect(testBoard.board[attackedCoord].isHit).toBe(true);
    expect(testBoard.board[attackedCoord].hasShip).toBe(false);
  });
  it("attacked cell has a ship, expect to call hit method on the ship placed at attacked cell", () => {
    const entry = 2;
    testBoard.placeShip(entry, typeOfShips[2]);
    const attackedCoord = 2;
    testBoard.receiveAttack(attackedCoord);

    expect(testBoard.board[attackedCoord].hasShip.hit).toHaveBeenCalledTimes(1);
  });

  it("attacked cell has a ship, expect to call isSunk method on the ship placed at attacked cell", () => {
    const entry = 2;
    testBoard.placeShip(entry, typeOfShips[2]);
    const attackedCoord = 2;
    testBoard.receiveAttack(attackedCoord);

    expect(testBoard.board[attackedCoord].hasShip.isSunk).toHaveBeenCalledTimes(
      1
    );
  });
});
