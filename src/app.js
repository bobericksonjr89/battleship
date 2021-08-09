const Player = require("./Player.js");
const Gameboard = require("./Gameboard.js");
const Ship = require("./Ship.js");
const DOM = require("./DOM.js");

const app = (() => {
  // assign player1
  const player1 = Player();
  // assign player2
  const player2 = Player();
  // init turn variable
  let turn = 0;
  // player 1 places ships
  // player 2 places ships
  // (preselected for now...)
  function placeShips() {
    player1.playerBoard.placeShip(player1.patrolBoat, 2, 4, "vertical");
    player1.playerBoard.placeShip(player1.submarine, 1, 0, "horizontal");
    player1.playerBoard.placeShip(player1.destroyer, 8, 3, "vertical");
    player1.playerBoard.placeShip(player1.battleship, 4, 4, "vertical");
    player1.playerBoard.placeShip(player1.carrier, 1, 2, "horizontal");

    player2.playerBoard.placeShip(player2.patrolBoat, 0, 0, "vertical");
    player2.playerBoard.placeShip(player2.submarine, 4, 7, "vertical");
    player2.playerBoard.placeShip(player2.destroyer, 5, 1, "horizontal");
    player2.playerBoard.placeShip(player2.battleship, 2, 2, "vertical");
    player2.playerBoard.placeShip(player2.carrier, 5, 5, "horizontal");
  }

  // gameflow starts
  function gameFlow() {
    turn++;
    // odd turns are player 1
    //DO WHILE??
    if (turn % 2 === 1) {
    }
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
  gameFlow();
})();
