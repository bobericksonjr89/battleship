const Player = require("./Player.js");
const DOM = require("./DOM.js");
const { displayHover } = require("./DOM.js");

const app = (() => {
  // DOM Capture
  const shipButtons = document.querySelectorAll(".ship");
  const directionButton = document.querySelector(".direction-button-checkbox");
  const placeShipSpaces = document.querySelectorAll(
    ".place-ships__board-space"
  );
  const enemySpaces = document.querySelectorAll(".game-area__gameboard-space");
  const startButton = document.querySelector(".place-ships__start-game");

  // Event Handlers
  shipButtons.forEach((button) =>
    button.addEventListener("click", selectShipButton)
  );

  startButton.addEventListener("click", startGame);

  let player1 = Player();

  let player2 = Player();
  let turn = 1;
  let shipsPlaced = 0;

  function startGame() {
    if (shipsPlaced !== 5) {
      return;
    }
    DOM.togglePlaceShipsToGame();
    enemySpaces.forEach((space) => space.addEventListener("click", attack));
  }

  function selectShipButton(e) {
    const shipButtonArray = [...shipButtons];
    const otherButtons = shipButtonArray.filter(
      (button) => button !== e.target
    );
    const player1Ships = {
      patrol: player1.patrolBoat,
      submarine: player1.submarine,
      destroyer: player1.destroyer,
      battleship: player1.battleship,
      carrier: player1.carrier,
    };
    const ship = player1Ships[e.target.dataset.ship];
    console.log(ship);

    const savePlaceShip = (event) => {
      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);
      const direction = getDirection();
      console.log(ship, x, y, direction);
      let result = player1.playerBoard.placeShip(ship, x, y, direction);
      if (result === true) {
        DOM.colorPlayerSpace(ship, x, y, direction);
        DOM.savePlayerHover(ship, x, y, direction);
        DOM.resetShipButtons(shipButtons);
        otherButtons.forEach((button) =>
          button.addEventListener("click", selectShipButton)
        );
        DOM.disableButton(e.target);
        placeShipSpaces.forEach((space) => {
          space.removeEventListener("click", savePlaceShip);
          space.removeEventListener("mouseover", hoverEvent);
        });
        shipsPlaced++;
      }
    };

    const hoverEvent = (e) => {
      DOM.displayHover(
        ship,
        e.target.dataset.x,
        e.target.dataset.y,
        getDirection()
      );
    };

    DOM.clearFilledSpaces();

    if (e.target.classList.contains("ship--activated")) {
      DOM.resetShipButtons(shipButtons);
      otherButtons.forEach((button) =>
        button.addEventListener("click", selectShipButton)
      );
      return;
    }

    otherButtons.forEach((button) =>
      button.removeEventListener("click", selectShipButton)
    );
    DOM.addActivatedClass(e.target);
    DOM.addDeactivatedClass(otherButtons);
    placeShipSpaces.forEach((space) => {
      space.addEventListener("mouseover", hoverEvent);
      space.addEventListener("click", savePlaceShip);
    });
  }

  function getDirection() {
    if (directionButton.checked === false) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  function placeAIShips() {
    /*     player1.playerBoard.placeShip(player1.patrolBoat, 2, 4, "vertical");
    DOM.colorPlayerSpace(player1.patrolBoat, 2, 4, "vertical");
    player1.playerBoard.placeShip(player1.submarine, 1, 0, "horizontal");
    DOM.colorPlayerSpace(player1.submarine, 1, 0, "horizontal");
    player1.playerBoard.placeShip(player1.destroyer, 8, 3, "vertical");
    DOM.colorPlayerSpace(player1.destroyer, 8, 3, "vertical");
    player1.playerBoard.placeShip(player1.battleship, 4, 4, "vertical");
    DOM.colorPlayerSpace(player1.battleship, 4, 4, "vertical");
    player1.playerBoard.placeShip(player1.carrier, 1, 2, "horizontal");
    DOM.colorPlayerSpace(player1.carrier, 1, 2, "horizontal"); */

    const AIShips = [
      /*       player2.patrolBoat,
      player2.submarine,
      player2.destroyer,
      player2.battleship, */
      player2.carrier,
    ];
    player2.playerBoard.placeShipsRandomly(AIShips);

    /* player2.playerBoard.placeShip(player2.patrolBoat, 0, 0, "vertical");
    player2.playerBoard.placeShip(player2.submarine, 4, 7, "vertical");
    player2.playerBoard.placeShip(player2.destroyer, 5, 1, "horizontal");
    player2.playerBoard.placeShip(player2.battleship, 2, 2, "vertical");
    player2.playerBoard.placeShip(player2.carrier, 5, 5, "horizontal"); */
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
    DOM.togglePlaceShipsToGame();
    shipButtons.forEach((button) => DOM.resetButton(button));
    player1 = Player();
    player2 = Player();
    turn = 1;
    shipsPlaced = 0;
    placeAIShips();
  }

  placeAIShips();
})();

module.exports = app;
