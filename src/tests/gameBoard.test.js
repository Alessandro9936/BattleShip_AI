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

    expect(testBoard.board[2 - 1].hasShip).not.toBeFalsy();
    expect(testBoard.board[3 - 1].hasShip).not.toBeFalsy();
    expect(testBoard.board[4 - 1].hasShip).not.toBeFalsy();
    expect(testBoard.board[5 - 1].hasShip).toBeFalsy();
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
  it("place all ships successfully", () => {
    testBoard.tweakDirection();
    testBoard.placeShip(13, typeOfShips[0]);
    testBoard.tweakDirection();
    testBoard.placeShip(25, typeOfShips[1]);
    testBoard.placeShip(91, typeOfShips[2]);
    testBoard.tweakDirection();
    testBoard.placeShip(46, typeOfShips[3]);
    testBoard.placeShip(79, typeOfShips[4]);

    expect(testBoard.shipsInBoard).toHaveLength(5);
  });

  it("doesn't place ship if coords collide", () => {
    testBoard.tweakDirection();
    testBoard.placeShip(13, typeOfShips[0]);
    testBoard.tweakDirection();

    expect(() => {
      testBoard.placeShip(22, typeOfShips[1]);
    }).toThrowError();
  });
});
