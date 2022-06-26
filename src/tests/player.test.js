/* eslint-disable no-undef */
import Player from '../factories/player';
import gameBoard from '../factories/gameBoard';

jest.mock('../factories/gameBoard');

beforeEach(() => {
  gameBoard.mockClear();
});

describe('Player ()', () => {
  let testPlayer;
  beforeEach(() => {
    testPlayer = new Player();
  });

  it('expect gameBoard to have been instantied when a new player is created', () => {
    expect(gameBoard).toHaveBeenCalledTimes(1);
  });

  it('expect to switch status to false when called (default true)', () => {
    testPlayer.switchStatus();
    expect(testPlayer.status).toBe(false);
  });

  it('expect to switch status to false when called (set false)', () => {
    testPlayer.switchStatus();
    testPlayer.switchStatus();

    expect(testPlayer.status).toBe(true);
  });
});
