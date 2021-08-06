const Gameboard = require("./Gameboard.js");
const Ship = require("./Ship.js");

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
