/* eslint-disable no-undef */
import GameBoard from '../factories/gameBoard';
import AI from '../factories/AI';

jest.mock('../factories/gameBoard');

beforeEach(() => {
  GameBoard.mockClear();
});

describe('Player ()', () => {
  let testAI;
  beforeEach(() => {
    testAI = new AI(false);
  });

  it('expect GameBoard to have been instantied when a new player is created', () => {
    expect(GameBoard).toHaveBeenCalledTimes(1);
  });
  it('expect to switch status to false when called (default true)', () => {
    testAI.switchStatus();
    expect(testAI.status).toBe(true);
  });

  it('expect to switch status to false when called (set false)', () => {
    testAI.switchStatus();
    testAI.switchStatus();

    expect(testAI.status).toBe(false);
  });

  it('place 5 ships on GameBoard automatically', () => {
    testAI.placeRandomShips();
    const spy = jest.spyOn(GameBoard.prototype, 'placeShip');
    expect(spy).toHaveBeenCalled();
  });

  it('sendAttack returns a number', () => {
    expect(testAI.sendAttack()).not.toBeNaN();
  });
});
