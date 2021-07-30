const Ship = require("../src/ship.js");

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
  }

  const placeShip = (ship, x, y, direction) => {
    const shipLength = ship.length;
    if (direction === "horizontal") {
      if (x + shipLength - 1 > 9) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        if (board[x + i][y]) {
          return false;
        }
        board[x + i][y] = ship.name;
      }
    }

    if (direction === "vertical") {
      if (y + shipLength - 1 > 9) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        if (board[x][y + i]) {
          return false;
        }
        board[x][y + i] = ship.name;
      }
    }

    return true;
  };

  return { placeShip, board };
};

/* const playerboard = Gameboard();
playerboard.placeShip(Ship(4, "battleship"), 6, 9, "horizontal"); */

module.exports = Gameboard;

//Gameboard.placeShip(Ship(4), x, y, direction);
// placeship returns true, false if ship won't fit on board
// false if space already taken
