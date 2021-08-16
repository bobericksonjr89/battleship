const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
  }

  const ships = [];

  const placeShip = (ship, x, y, direction) => {
    // I CHANGED THIS
    const shipLength = ship.length;
    if (direction === "horizontal") {
      if (x + shipLength - 1 > 9) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        if (board[x + i][y]) {
          return false;
        }
      }
      for (let i = 0; i < shipLength; i++) {
        board[x + i][y] = ship;
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
      }
      for (let i = 0; i < shipLength; i++) {
        board[x][y + i] = ship;
      }
    }
    ships.push(ship);
    return true;
  };

  const placeShipsRandomly = (ships) => {
    console.log(ships);
    let result;
    let x;
    let y;
    let direction;
    ships.forEach((ship) => {
      do {
        x = randomInt();
        y = randomInt();
        direction = randomInt() <= 4 ? "horizontal" : "vertical";
        console.log(ship, x, y, direction);
        result = placeShip(ship, x, y, direction);
        console.log(ships);
      } while (result === false);
    });
  };

  const randomInt = () => {
    return Math.floor(
      Math.random() * (Math.floor(9) - Math.ceil(0) + 1) + Math.ceil(0)
    );
  };

  const recieveAttack = (x, y) => {
    if (board[x][y]) {
      board[x][y].hit();
      if (board[x][y].isSunk()) {
        return board[x][y];
      }
      return "hit";
    }
    if (!board[x][y]) {
      board[x][y] = "miss";
      return "miss";
    }
  };

  const allSunk = () => {
    return ships.every((ship) => ship.isSunk() === true);
  };

  return { placeShip, placeShipsRandomly, recieveAttack, allSunk, board };
};

module.exports = Gameboard;
