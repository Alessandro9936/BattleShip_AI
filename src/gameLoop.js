import './styles.css';

import Player from './factories/player';
import AI from './factories/AI';
import typeOfShips from './helpers/typeOfShips';

const gameLoop = (() => {
  const cellsToDrop = document.querySelectorAll('.grid-modal .cell');
  const toggleDirectionBtn = document.querySelector('.toggle-direction');

  const shipsToPlace = [...typeOfShips];
  const player = new Player();
  const ai = new AI(false);

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
    const cell = +e.target.dataset.cell;
    const direction = player.gameBoard.dir;

    for (let i = 0; i < shipToPlace.length; i++) {
      const cur = document.querySelector(
        `[data-cell="${direction === 'h' ? cell + i : cell + i * 10}"]`
      );

      cur.classList.contains('placed')
        ? cur.classList.toggle('cant-place')
        : cur.classList.toggle('hovering');
    }
  }

  function _addShipOnBoard(e, shipToPlace) {
    try {
      const cell = +e.target.dataset.cell;
      player.gameBoard.placeShip(cell, shipToPlace);

      _displayShipOnBoard(cell, shipToPlace);
    } catch {
      shipsToPlace.unshift(shipToPlace);
    }
  }

  function _displayShipOnBoard(cell, shipToPlace) {
    const direction = player.gameBoard.dir;

    for (let i = 0; i < shipToPlace.length; i++) {
      const cur = document.querySelector(
        `[data-cell="${direction === 'h' ? cell + i : cell + i * 10}"]`
      );
      cur.setAttribute('disabled', '');
      cur.className = 'cell placed';
    }
  }
})();
