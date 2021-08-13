/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((module) => {

const DOM = (() => {
  // DOM capture
  const playerBoard = document.querySelector(".player-info__board");
  const gameBoard = document.querySelector(".game-area__gameboard");
  const message = document.querySelector(".message-area__message");
  const playAgain = document.querySelector(".message-area__button");

  function displayPlayerBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let playerSpace = document.createElement("div");
        playerSpace.classList.add("player-info__player-space");
        playerSpace.dataset.x = j;
        playerSpace.dataset.y = i;
        playerBoard.appendChild(playerSpace);
      }
    }
  }

  function displayGameBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let gameSpace = document.createElement("div");
        gameSpace.classList.add("game-area__gameboard-space");
        gameSpace.dataset.x = j;
        gameSpace.dataset.y = i;
        gameBoard.appendChild(gameSpace);
      }
    }
  }

  function colorPlayerSpace(boat, x, y, direction) {
    let playerSpace;

    for (let i = 0; i < boat.length; i++) {
      if (direction === "horizontal") {
        playerSpace = document.querySelector(
          `.player-info__player-space[data-x='${x + i}'][data-y='${y}']`
        );
        playerSpace.classList.add("player-info__player-space--filled");
      }
      if (direction === "vertical") {
        playerSpace = document.querySelector(
          `.player-info__player-space[data-x='${x}'][data-y='${y + i}']`
        );
        playerSpace.classList.add("player-info__player-space--filled");
      }
    }
  }

  function displayHit(x, y) {
    const space = document.querySelector(
      `.game-area__gameboard-space[data-x='${x}'][data-y='${y}']`
    );
    space.classList.add("game-area__gameboard-space--hit");
    message.innerText = "A hit!";
  }

  function displayMiss(x, y) {
    const space = document.querySelector(
      `.game-area__gameboard-space[data-x='${x}'][data-y='${y}']`
    );
    space.classList.add("game-area__gameboard-space--miss");
    message.innerText = "A miss!";
  }

  function displayPlayerHit(x, y) {
    const space = document.querySelector(
      `.player-info__player-space[data-x='${x}'][data-y='${y}']`
    );
    space.classList.add("player-info__player-space--hit");
    message.innerText = "You're hit!";
  }

  function displayPlayerMiss(x, y) {
    console.log(x, y);
    const space = document.querySelector(
      `.player-info__player-space[data-x='${x}'][data-y='${y}']`
    );
    console.log(space);
    space.classList.add("player-info__player-space--miss");
    message.innerText = "Opponnent missed!";
  }

  function displaySunkShip(coordinates) {
    coordinates.forEach((coord) => {
      const space = document.querySelector(
        `.game-area__gameboard-space[data-x='${coord.x}'][data-y='${coord.y}']`
      );
      space.innerText = "☓";
    });
  }

  function displayWinner(winner) {
    if (winner === "player") {
      message.innerText = "You won!";
    } else {
      message.innerText = "Computer defeated you!";
    }

    playAgain.classList.add("message-area__button--visible");
  }

  function clearMessage() {
    message.innerText = "";
    playAgain.classList.remove("message-area__button--visible");
  }

  function clearBoards() {
    for (let i = 0; i < 100; i++) {
      gameBoard.children[i].classList.remove(
        "game-area__gameboard-space--hit",
        "game-area__gameboard-space--miss"
      );
      gameBoard.children[i].innerText = "";
      playerBoard.children[i].classList.remove(
        "player-info__player-space--filled",
        "player-info__player-space--hit",
        "player-info__player-space--miss"
      );
    }
  }

  displayPlayerBoard();
  displayGameBoard();

  return {
    colorPlayerSpace,
    displayHit,
    displayMiss,
    displayPlayerHit,
    displayPlayerMiss,
    displayWinner,
    displaySunkShip,
    clearMessage,
    clearBoards,
  };
})();

module.exports = DOM;


/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((module) => {

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
  const turnResults = [];
  let assumedDirection;

  let foundHit;
  let direction;
  let directionConfirmed;

  const attackBoard = (enemyBoard, x, y) => {
    const result = enemyBoard.recieveAttack(x, y);
    return result;
  };

  const randomCoords = () => {
    let X;
    let Y;
    do {
      X = randomInt();
      Y = randomInt();
    } while (moves.some((move) => move.x === X && move.y === Y));
    moves.push({ x: X, y: Y });
    return { x: X, y: Y };
  };

  const trySquareToLeft = (ofThisSquare) => {
    moves.push({ x: ofThisSquare.x - 1, y: ofThisSquare.y });
    return { x: ofThisSquare.x - 1, y: ofThisSquare.y };
  };

  const trySquareToBottom = (ofThisSquare) => {
    moves.push({ x: ofThisSquare.x, y: ofThisSquare.y + 1 });
    return { x: ofThisSquare.x, y: ofThisSquare.y + 1 };
  };

  const trySquareToTop = (ofThisSquare) => {
    moves.push({ x: ofThisSquare.x, y: ofThisSquare.y - 1 });
    return { x: ofThisSquare.x, y: ofThisSquare.y - 1 };
  };

  const trySquareToRight = (ofThisSquare) => {
    moves.push({ x: ofThisSquare.x + 1, y: ofThisSquare.y });
    return { x: ofThisSquare.x + 1, y: ofThisSquare.y };
  };

  const trySquaresAroundHit = (hit) => {
    if (
      hit.x + 1 < 10 &&
      !moves.some((move) => move.x === hit.x + 1 && move.y === hit.y)
    ) {
      direction = "right";
      return trySquareToRight(hit);
    }
    if (
      hit.y + 1 < 10 &&
      !moves.some((move) => move.x === hit.x && move.y === hit.y + 1)
    ) {
      direction = "down";
      return trySquareToBottom(hit);
    }
    if (
      hit.x - 1 >= 0 &&
      !moves.some((move) => move.x === hit.x - 1 && move.y === hit.y)
    ) {
      direction = "left";
      return trySquareToLeft(hit);
    }
    if (
      hit.y - 1 >= 0 &&
      !moves.some((move) => move.x === hit.x && move.y === hit.y - 1)
    ) {
      direction = "up";
      return trySquareToTop(hit);
    }

    return randomCoords();
  };

  const generateCoordinates = () => {
    let lastTurn = turnResults[turnResults.length - 1];
    let lastMove = moves[moves.length - 1];
    console.log(lastTurn);
    console.log(lastMove);
    if (lastTurn instanceof Object) {
      // reset variables once ship is finally sank
      foundHit = null;
      direction = null;
      directionConfirmed = false;
      return randomCoords();
    }

    if (lastTurn === "hit" && !foundHit) {
      foundHit = lastMove; // store coords whenever ship is first hit
      // ship was just found, so try to find out which direction it is oriented
      return trySquaresAroundHit(foundHit);
    }

    if (lastTurn === "hit" && direction) {
      // we found a hit, and we found the direction
      directionConfirmed = true;
      // there were two hits in a row
      // keep trying in that direction
      if (
        direction === "right" &&
        lastMove.x + 1 < 10 &&
        !moves.some(
          (move) => move.x === lastMove.x + 1 && move.y === lastMove.y
        )
      ) {
        return trySquareToRight(lastMove);
      }
      if (
        direction === "down" &&
        lastMove.y + 1 < 10 &&
        !moves.some(
          (move) => move.x === lastMove.x && move.y === lastMove.y + 1
        )
      ) {
        return trySquareToBottom(lastMove);
      }
      if (
        direction === "left" &&
        lastMove.x - 1 >= 0 &&
        !moves.some(
          (move) => move.x === lastMove.x - 1 && move.y === lastMove.y
        )
      ) {
        return trySquareToLeft(lastMove);
      }
      if (
        direction === "up" &&
        lastMove.y - 1 >= 0 &&
        !moves.some(
          (move) => move.x === lastMove.x && move.y === lastMove.y - 1
        )
      ) {
        return trySquareToTop(lastMove);
      }
      return trySquaresAroundHit(foundHit);
    }

    if (lastTurn === "miss" && foundHit && !directionConfirmed) {
      // we found a hit, but the direction we tried didn't work
      // try new direction
      return trySquaresAroundHit(foundHit);
    }

    if (lastTurn === "miss" && directionConfirmed) {
      // try opposit direction starting from foundHit
      if (
        direction === "right" &&
        foundHit.x - 1 >= 0 &&
        !moves.some(
          (move) => move.x === foundHit.x - 1 && move.y === foundHit.y
        )
      ) {
        direction = "left";
        return trySquareToLeft(foundHit);
      }
      if (
        direction === "down" &&
        foundHit.y - 1 >= 0 &&
        !moves.some(
          (move) => move.x === foundHit.x && move.y === foundHit.y - 1
        )
      ) {
        direction = "up";
        return trySquareToTop(foundHit);
      }
      if (
        direction === "left" &&
        foundHit.x + 1 < 10 &&
        !moves.some(
          (move) => move.x === foundHit.x + 1 && move.y === foundHit.y
        )
      ) {
        direction = "right";
        return trySquareToRight(foundHit);
      }
      if (
        direction === "up" &&
        foundHit.y + 1 < 10 &&
        !moves.some(
          (move) => move.x === foundHit.x && move.y === foundHit.y + 1
        )
      ) {
        direciton = "down";
        return trySquareToBottom(foundHit);
      }
    }

    return randomCoords();
  };

  /* const generateCoordinates = () => {
    const length = turnResults.length;
    let lastHit;

    if (turnResults[length - 1] instanceof Object) { a
      asummedDirection = null;
      return randomCoords();
    }

    if (
      turnResults[length - 1] === "miss" &&
      turnResults[length - 2] === "hit" &&
      turnResults[length - 3] === "hit" &&
      turnResults[length - 4] === "hit" &&
      turnResults[length - 5] === "hit" &&
      assumedDirection === "horizontal"
    ) {
      let firstHit = moves[moves.length - 5];
      if (
        firstHit.x - 1 >= 0 &&
        !moves.some(
          (move) => move.x === firstHit.x - 1 && move.y === firstHit.y
        )
      ) {
        return trySquareToLeft(firstHit);
      }
    }

    if (
      turnResults[length - 1] === "miss" &&
      turnResults[length - 2] === "hit" &&
      turnResults[length - 3] === "hit" &&
      turnResults[length - 4] === "hit" &&
      assumedDirection === "horizontal"
    ) {
      let firstHit = moves[moves.length - 4];
      if (
        firstHit.x - 1 >= 0 &&
        !moves.some(
          (move) => move.x === firstHit.x - 1 && move.y === firstHit.y
        )
      ) {
        return trySquareToLeft(firstHit);
      }
    }

    if (
      turnResults[length - 1] === "miss" &&
      turnResults[length - 2] === "hit" &&
      turnResults[length - 3] === "hit" &&
      assumedDirection === "horizontal"
    ) {
      let firstHit = moves[moves.length - 3];
      if (
        firstHit.x - 1 >= 0 &&
        !moves.some(
          (move) => move.x === firstHit.x - 1 && move.y === firstHit.y
        )
      ) {
        return trySquareToLeft(firstHit);
      }
    }

    if (
      turnResults[length - 1] === "hit" &&
      turnResults[length - 2] === "miss" &&
      turnResults[length - 3] === "hit" &&
      assumedDirection === "vertical"
    ) {
      let lastHit = moves[moves.length - 1];
      if (
        lastHit.x - 1 >= 0 &&
        !moves.some((move) => move.x === lastHit.x && move.y === lastHit.y + 1)
      ) {
        return trySquareToBottom(lastHit);
      }
    }
    if (
      turnResults[length - 1] === "miss" &&
      turnResults[length - 2] === "hit" &&
      turnResults[length - 3] === "miss" &&
      turnResults[length - 4] === "hit" &&
      assumedDirection === "vertical"
    ) {
      let firstHit = moves[moves.length - 4];
      if (
        firstHit.x - 1 >= 0 &&
        !moves.some(
          (move) => move.x === firstHit.x && move.y === firstHit.y - 1
        )
      ) {
        return trySquareToTop(firstHit);
      }
    }

    // if a hit then a miss, go back and try squares around the hit
    if (
      turnResults[length - 1] === "hit" ||
      turnResults[length - 2] === "hit" ||
      turnResults[length - 3] === "hit" ||
      turnResults[length - 4] === "hit"
    ) {
      if (
        turnResults[length - 3] === "miss" &&
        turnResults[length - 2] === "miss" &&
        turnResults[length - 1] === "miss"
      ) {
        lastHit = moves[moves.length - 4];
      } else if (
        turnResults[length - 3] === "hit" &&
        turnResults[length - 2] === "miss" &&
        turnResults[length - 1] === "miss"
      ) {
        lastHit = moves[moves.length - 3];
      } else if (
        turnResults[length - 2] === "hit" &&
        turnResults[length - 1] === "miss"
      ) {
        lastHit = moves[moves.length - 2];
      } else if (turnResults[length - 1] === "hit") {
        lastHit = moves[moves.length - 1];
      } else {
        assumedDirection = null;
        return randomCoords();
      }
      //

      if (
        lastHit.x + 1 < 10 &&
        !moves.some((move) => move.x === lastHit.x + 1 && move.y === lastHit.y)
      ) {
        assumedDirection = "horizontal";
        return trySquareToRight(lastHit);
      }
      //
      if (
        lastHit.y + 1 < 10 &&
        !moves.some((move) => move.x === lastHit.x && move.y === lastHit.y + 1)
      ) {
        assumedDirection = "vertical";
        return trySquareToBottom(lastHit);
      }
      //
      if (
        lastHit.x - 1 >= 0 &&
        !moves.some((move) => move.x === lastHit.x - 1 && move.y === lastHit.y)
      ) {
        assumedDirection = "hotizontal";
        return trySquareToLeft(lastHit);
      }
      if (
        lastHit.y - 1 >= 0 &&
        !moves.some((move) => move.x === lastHit.x && move.y === lastHit.y - 1)
      ) {
        assumedDirection = "vertical";
        return trySquareToTop(lastHit);
      }
    }
    assumedDirection = null;
    return randomCoords();
  }; */

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
    turnResults,
  };
};

module.exports = Player;


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


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Player = __webpack_require__(/*! ./Player.js */ "./src/Player.js");
const DOM = __webpack_require__(/*! ./DOM.js */ "./src/DOM.js");

const app = (() => {
  // DOM Capture
  const enemySpaces = document.querySelectorAll(".game-area__gameboard-space");

  // Event Handlers
  enemySpaces.forEach((space) => space.addEventListener("click", attack));

  let player1 = Player();
  let player2 = Player();
  let turn = 1;
  // player 1 places ships
  // player 2 places ships
  // (preselected for now...)
  function placeShips() {
    player1.playerBoard.placeShip(player1.patrolBoat, 2, 4, "vertical");
    DOM.colorPlayerSpace(player1.patrolBoat, 2, 4, "vertical");
    player1.playerBoard.placeShip(player1.submarine, 1, 0, "horizontal");
    DOM.colorPlayerSpace(player1.submarine, 1, 0, "horizontal");
    player1.playerBoard.placeShip(player1.destroyer, 8, 3, "vertical");
    DOM.colorPlayerSpace(player1.destroyer, 8, 3, "vertical");
    player1.playerBoard.placeShip(player1.battleship, 4, 4, "vertical");
    DOM.colorPlayerSpace(player1.battleship, 4, 4, "vertical");
    player1.playerBoard.placeShip(player1.carrier, 1, 2, "horizontal");
    DOM.colorPlayerSpace(player1.carrier, 1, 2, "horizontal");

    player2.playerBoard.placeShip(player2.patrolBoat, 0, 0, "vertical");
    player2.playerBoard.placeShip(player2.submarine, 4, 7, "vertical");
    player2.playerBoard.placeShip(player2.destroyer, 5, 1, "horizontal");
    player2.playerBoard.placeShip(player2.battleship, 2, 2, "vertical");
    player2.playerBoard.placeShip(player2.carrier, 5, 5, "horizontal");
  }

  function attack(e) {
    if (turn % 2 !== 1) {
      return;
    }

    e.target.removeEventListener("click", attack);

    const xCoord = e.target.dataset.x;
    const yCoord = e.target.dataset.y;
    const result = player1.attackBoard(player2.playerBoard, xCoord, yCoord);
    if (result instanceof Object) {
      // returns ship object when ship sunk
      DOM.displayHit(xCoord, yCoord);
      const coords = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (player2.playerBoard.board[i][j] === result) {
            coords.push({ x: i, y: j });
          }
        }
      }
      DOM.displaySunkShip(coords);
    }
    if (result === "hit") {
      DOM.displayHit(xCoord, yCoord);
    }
    if (result === "miss") {
      DOM.displayMiss(xCoord, yCoord);
    }
    if (turn >= 33) {
      if (player2.playerBoard.allSunk()) {
        gameOver("player"); // p1 wins
        return;
      }
    }
    turn++;

    setTimeout(AIMove, 750);
  }

  function AIMove() {
    const AICoords = player2.generateCoordinates();
    const AIResult = player2.attackBoard(
      player1.playerBoard,
      AICoords.x,
      AICoords.y
    );
    if (AIResult === "hit" || AIResult instanceof Object) {
      DOM.displayPlayerHit(AICoords.x, AICoords.y);
    }
    if (AIResult === "miss") {
      DOM.displayPlayerMiss(AICoords.x, AICoords.y);
    }
    player2.turnResults.push(AIResult);
    if (turn >= 33) {
      if (player1.playerBoard.allSunk()) {
        gameOver("computer"); // p2 wins
        return;
      }
    }
    turn++;
  }

  function gameOver(winner) {
    DOM.displayWinner(winner);
    enemySpaces.forEach((space) => space.removeEventListener("click", attack));
    document
      .querySelector(".message-area__button")
      .addEventListener("click", resetGame);
  }

  function resetGame() {
    DOM.clearMessage();
    DOM.clearBoards();

    enemySpaces.forEach((space) => {
      space.classList.remove(
        "game-area__gameboard-space--hit",
        "game-area__gameboard-space--miss"
      );
      space.addEventListener("click", attack);
    });
    player1 = Player();
    player2 = Player();
    turn = 1;
    placeShips();
  }

  placeShips();
})();

module.exports = app;


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map