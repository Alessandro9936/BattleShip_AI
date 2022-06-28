import './styles.css';

import Player from './factories/player';
import AI from './factories/AI';
import typeOfShips from './helpers/typeOfShips';

import toggleTheme from './helpers/toggleTheme';

const gameLoop = (() => {
  const cellsToDrop = document.querySelectorAll('.grid-modal .cell');
  const toggleDirectionBtn = document.querySelector('.toggle-direction');
  const startGameBtn = document.querySelector('.new-game-btn');
  const aiGrid = document.querySelector('.AI-grid');

  const shipsToPlace = [...typeOfShips];
  const player = new Player();
  const ai = new AI(false);

  /* SHIP PLACING */

  cellsToDrop.forEach((cell) => {
    cell.addEventListener('mouseenter', (e) => {
      if (shipsToPlace.length === 0) return;
      _togglePreviewCells(e);
    });

    cell.addEventListener('mouseleave', (e) => {
      if (shipsToPlace.length === 0) return;
      _togglePreviewCells(e);
    });

    cell.addEventListener('click', (e) => {
      if (shipsToPlace.length === 0) return;
      const [shipToPlace] = shipsToPlace.splice(0, 1);
      _addShipOnBoard(e, shipToPlace);
    });
  });

  toggleDirectionBtn.addEventListener('click', () => {
    player.gameBoard.tweakDirection();
  });

  function _togglePreviewCells(e) {
    const shipToPlace = shipsToPlace[0];
    const cellHovered = +e.target.dataset.cell;

    for (let i = 0; i < shipToPlace.length; i++) {
      const cellNode = _getShipCellNode(i, cellHovered);

      cellNode.classList.contains('placed')
        ? cellNode.classList.toggle('cant-place')
        : cellNode.classList.toggle('hovering');
    }
  }

  function _addShipOnBoard(e, shipToPlace) {
    try {
      const cellClicked = +e.target.dataset.cell;
      player.gameBoard.placeShip(cellClicked, shipToPlace);

      _displayShipOnBoard(cellClicked, shipToPlace);
    } catch {
      shipsToPlace.unshift(shipToPlace);
    }
  }

  function _displayShipOnBoard(cell, shipToPlace) {
    for (let i = 0; i < shipToPlace.length; i++) {
      const cellInShipNode = _getShipCellNode(i, cell);

      cellInShipNode.setAttribute('disabled', '');
      cellInShipNode.className = 'cell placed';
    }
  }

  function _getShipCellNode(i, cell) {
    const placingDirection = player.gameBoard.dir;

    return document.querySelector(
      `[data-cell="${placingDirection === 'h' ? cell + i : cell + i * 10}"]`
    );
  }

  /* ******** */
  /* START NEW GAME */
  startGameBtn.addEventListener('click', _startGameHandler);

  function _startGameHandler() {
    if (shipsToPlace.length !== 0) return;

    _showGameContainer();
    _createPlayerBoard();
    _createAIBoard();
  }

  function _showGameContainer() {
    const modal = document.querySelector('.modal');
    const gameContainer = document.querySelector('main');

    modal.remove();
    gameContainer.classList.remove('hidden');
  }

  function _createPlayerBoard() {
    const gridContainer = document.querySelector('.player-grid');
    const { board } = player.gameBoard;

    _displayGrid(gridContainer, board);
  }

  function _createAIBoard() {
    const gridContainer = document.querySelector('.AI-grid');
    const { board } = ai.gameBoard;

    _displayGrid(gridContainer, board);
  }

  function _displayGrid(gridContainer, board) {
    for (let i = 0; i < board.length; i++) {
      const cell = _createCellNode(i);

      if (board[i].hasShip && gridContainer.classList.contains('player-grid')) {
        cell.style.backgroundColor = 'var(--yellow)';
      }

      gridContainer.appendChild(cell);
    }
  }

  function _createCellNode(i) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.setAttribute('data-cell', `${i + 1}`);
    return cell;
  }

  /* ******** */
  /* ATTACK ENEMY GAMEBOARD */
  aiGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const entry = +e.target.dataset.cell;
      ai.gameBoard.receiveAttack(entry);

      _displayAttack(ai.gameBoard.board, entry, e.target);
      _checkSunked(ai.gameBoard.shipsInBoard);
      player.switchStatus();

      _aiAutoAttack();
    }
  });

  function _displayAttack(board, entry, cell) {
    const mark = document.createElement('span');

    board[entry - 1].hasShip
      ? mark.classList.add('red-mark')
      : mark.classList.add('blue-mark');
    cell.appendChild(mark);
  }

  function _aiAutoAttack() {
    const entry = ai.sendAttack();

    const cellTarget = [
      ...document.querySelectorAll('.player-grid .cell'),
    ].find((c) => +c.dataset.cell === entry);

    player.gameBoard.receiveAttack(entry);

    _checkSunked(player.gameBoard.shipsInBoard);
    _displayAttack(player.gameBoard.board, entry, cellTarget);
    ai.switchStatus();
    player.switchStatus();
  }

  function _checkSunked(ships) {
    const activePlayer = player.status ? 'player' : 'ai';

    ships.forEach((ship) => {
      if (activePlayer === 'player' && ship.sunk) {
        const shipsLegend = document.querySelector('.ship-legend-player');
        _markShipSunkUI(ship, shipsLegend);
      } else if (activePlayer === 'ai' && ship.sunk) {
        const shipsLegend = document.querySelector('.ship-legend-ai');
        _markShipSunkUI(ship, shipsLegend);
      }
    });

    if (ships.every((ship) => ship.sunk)) {
      _createWinningModal();
    }
  }

  function _markShipSunkUI(ship, legend) {
    const shipSunkedNode = [...legend.querySelectorAll('.ship')].find(
      (shipNode) => ship.id === shipNode.dataset.ship
    );

    if (shipSunkedNode.style.backgroundColor === 'var(--red)') return;

    shipSunkedNode.style.backgroundColor = 'var(--red)';
    _updateMessage(`${player.status ? 'Enemy' : 'Your'} ${ship.id} is sunked!`);
  }

  function _updateMessage(message) {
    const messageContainer = document.querySelector('.next-move-btn');
    messageContainer.textContent = message;

    setTimeout(() => {
      messageContainer.textContent = 'Attack enemy board';
    }, 2000);
  }

  function _createWinningModal() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');

    const heading = document.createElement('h1');
    heading.textContent = `${player.status ? 'YOU ARE' : 'AI IS'} THE WINNER`;
    modalContainer.appendChild(heading);

    const gameContainer = document.querySelector('main');
    gameContainer.classList.add('hidden');
    document.body.appendChild(modalContainer);
  }

  /* ******** */
  const toggleThemeBtn = document.querySelector('.toggle-btn');
  toggleThemeBtn.addEventListener('click', toggleTheme);
})();
