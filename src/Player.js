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
  const turnResults = [];

  const attackBoard = (enemyBoard, x, y) => {
    const result = enemyBoard.recieveAttack(x, y);
    return result;
  };

  const randomCoords = () => {
    do {
      X = randomInt();
      Y = randomInt();
    } while (moves.some((move) => move.x === X && move.y === Y));
    moves.push({ x: X, y: Y });

    return { x: X, y: Y };
  };

  const generateCoordinates = () => {
    const length = turnResults.length;
    let X;
    let Y;
    let lastHit;
    let justSank;

    if (turnResults[length - 1] instanceof Object) {
      justSank = true;
    }
    // if a hit then a miss, go back and try squares around the hit
    if (
      justSank !== true &&
      (turnResults[length - 1] === "hit" ||
        turnResults[length - 2] === "hit" ||
        turnResults[length - 3] === "hit" ||
        turnResults[length - 4] === "hit")
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
        return randomCoords();
      }
      //

      if (
        lastHit.x + 1 < 10 &&
        !moves.some((move) => move.x === lastHit.x + 1 && move.y === lastHit.y)
      ) {
        moves.push({ x: lastHit.x + 1, y: lastHit.y });
        return { x: lastHit.x + 1, y: lastHit.y };
      }
      //
      if (
        lastHit.y + 1 < 10 &&
        !moves.some((move) => move.x === lastHit.x && move.y === lastHit.y + 1)
      ) {
        moves.push({ x: lastHit.x, y: lastHit.y + 1 });
        return { x: lastHit.x, y: lastHit.y + 1 };
      }
      //
      if (
        lastHit.x - 1 >= 0 &&
        !moves.some((move) => move.x === lastHit.x - 1 && move.y === lastHit.y)
      ) {
        moves.push({ x: lastHit.x - 1, y: lastHit.y });
        return { x: lastHit.x - 1, y: lastHit.y };
      }
      if (
        lastHit.y - 1 >= 0 &&
        !moves.some((move) => move.x === lastHit.x && move.y === lastHit.y - 1)
      ) {
        moves.push({ x: lastHit.x, y: lastHit.y - 1 });
        return { x: lastHit.x, y: lastHit.y - 1 };
      }
    }
    return randomCoords();
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
    turnResults,
  };
};

module.exports = Player;
