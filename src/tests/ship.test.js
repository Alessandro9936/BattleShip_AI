import Ship from "../factories/ship";

let testShip;
beforeEach(() => (testShip = new Ship(3, [1, 2, 3])));
describe("hit method", () => {
  it("hit(coords) hit boat coords add coords to hits array", () => {
    const hitCoord = 2;
    testShip.hit(hitCoord);
    expect(testShip.hits).toHaveLength(1);
  });
});
describe("isSunk method", () => {
  it("all coords of a boat are hitted, boat is sunk", () => {
    const hitCoord1 = 1;
    const hitCoord2 = 2;
    const hitCoord3 = 3;
    testShip.hit(hitCoord1);
    testShip.hit(hitCoord2);
    testShip.hit(hitCoord3);
    let test = testShip.isSunk();
    expect(test).toBe(true);
  });

  it("NOT all coords of a boat are hitted, boat is NOT sunk", () => {
    const hitCoord1 = 1;
    const hitCoord2 = 2;

    testShip.hit(hitCoord1);
    testShip.hit(hitCoord2);

    let test = testShip.isSunk();
    expect(test).toBe(false);
  });
});
