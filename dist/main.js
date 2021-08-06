/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Ship = __webpack_require__(/*! ./Ship.js */ "./src/Ship.js");

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = [];
  }

  const ships = [];

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
        board[x + i][y] = ship;
      }
      ships.push(ship);
    }

    if (direction === "vertical") {
      if (y + shipLength - 1 > 9) {
        return false;
      }
      for (let i = 0; i < shipLength; i++) {
        if (board[x][y + i]) {
          return false;
        }
        board[x][y + i] = ship;
      }
      ships.push(ship);
    }
    return true;
  };

  const recieveAttack = (x, y) => {
    if (board[x][y]) {
      board[x][y].hit();
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

  return { placeShip, recieveAttack, allSunk, board };
};

module.exports = Gameboard;


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gameboard = __webpack_require__(/*! ./Gameboard.js */ "./src/Gameboard.js");
const Ship = __webpack_require__(/*! ./Ship.js */ "./src/Ship.js");

const Player = () => {
  const playerBoard = Gameboard();

  const patrolBoat = Ship(2, "Patrol Boat");
  const submarine = Ship(3, "Submarine");
  const destroyer = Ship(3, "Destroyer");
  const battleship = Ship(4, "Battleship");
  const carrier = Ship(5, "Carrier");

  const moves = [];

  const attackBoard = (enemyBoard, x, y) => {
    const result = enemyBoard.recieveAttack(x, y);
    return result;
  };

  const generateCoordinates = () => {
    let randomX;
    let randomY;
    do {
      randomX = randomInt();
      randomY = randomInt();
    } while (moves.includes({ x: randomX, y: randomY }));
    moves.push({ x: randomX, y: randomY });

    return { x: randomX, y: randomY };
    // get new coordinates if already fired
    // do-while loop in game module
  };

  const randomInt = () => {
    return Math.floor(
      Math.random() * (Math.floor(9) - Math.ceil(0) + 1) + Math.ceil(0)
    );
  };

  return {
    playerBoard,
    patrolBoat,
    submarine,
    destroyer,
    battleship,
    carrier,
    attackBoard,
    generateCoordinates,
  };
};

module.exports = Player;

const player = Player();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();
player.generateCoordinates();


/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((module) => {

const Ship = (length, name) => {
  let health = length;

  const hit = () => {
    if (!isSunk()) {
      health--;
      console.log(health);
      return true;
    }
    return false;
  };

  const isSunk = () => {
    if (health === 0) {
      return true;
    }
    return false;
  };
  return { length, name, hit, isSunk };
};
module.exports = Ship;

// hit returns true or false (false if already hit)
// isSunk returns true or false;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
const Player = __webpack_require__(/*! ./Player.js */ "./src/Player.js");
const Gameboard = __webpack_require__(/*! ./Gameboard.js */ "./src/Gameboard.js");
const Ship = __webpack_require__(/*! ./Ship.js */ "./src/Ship.js");

const app = (() => {})();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map