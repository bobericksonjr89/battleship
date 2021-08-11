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
  let assumedDirection;

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

  const generateCoordinates = () => {
    const length = turnResults.length;
    let lastHit;

    if (turnResults[length - 1] instanceof Object) {
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
