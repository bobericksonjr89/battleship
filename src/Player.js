const GameBoard = require("./Gameboard.js");
const Ship = require("./Ship.js");

const Player = () => {
  const playerBoard = Gameboard();

  const patrolBoat = Ship(2, "Patrol Boat");
  const submarine = Ship(3, "Submarine");
  const destroyer = Ship(3, "Destroyer");
  const battleShip = Ship(4, "Battleship");
  const carrier = Ship(5, "Carrier");

  const attackBoard = (enemyBoard, x, y) => {};

  return { playerBoard, attackBoard };
};

module.exports = Player;
