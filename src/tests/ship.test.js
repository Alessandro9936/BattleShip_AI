import Ship from "../factories/ship";

let testShip;
beforeEach(() => (testShip = new Ship(3, [2, 3, 4])));
describe("hit method", () => {
  it("hit(coords) hit boat coords add coords to hits array", () => {
    const hitCoords = 2;
    testShip.hit(hitCoords);
    expect(testShip.hits).toHaveLength(1);
  });
});
