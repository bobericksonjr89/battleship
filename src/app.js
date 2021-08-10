const Player = require("./Player.js");
const Gameboard = require("./Gameboard.js");
const Ship = require("./Ship.js");
const DOM = require("./DOM.js");

const app = (() => {
  // DOM Capture
  const enemySpaces = document.querySelectorAll(".game-area__gameboard-space");

  // Event Handlers
  enemySpaces.forEach((space) => space.addEventListener("click", attack));

  const player1 = Player();
  const player2 = Player();
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
    if (turn >= 34) {
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
    if (turn >= 34) {
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
  }

  // even turns are player 2
  // 34 turns minimum before win condition could be met
  // player selects space
  // returns hit or miss
  // DOM displays result
  // "sink ship" if applicable
  // DOM displays sunked ship
  // if turn >= 34, check if game over
  // if game over, display winner
  // click to restart game
  //  reset turns, reset players, place ships, start the flow again

  placeShips();
})();

module.exports = app;
