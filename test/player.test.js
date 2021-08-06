const Gameboard = require("../src/Gameboard.js");
const Player = require("../src/Player.js");

test("players get a hit or miss when attacking", () => {
  const player1 = Player();
  const player2 = Player();
  player2.playerBoard.placeShip(player2.battleship, 2, 2, "horizontal");
  player2.playerBoard.placeShip(player2.destroyer, 6, 4, "vertical");

  expect(player1.attackBoard(player2.playerBoard, 0, 1)).toBe("miss");
  expect(player1.attackBoard(player2.playerBoard, 3, 2)).toBe("hit");
  expect(player1.attackBoard(player2.playerBoard, 6, 6)).toBe("hit");
  expect(player1.attackBoard(player2.playerBoard, 7, 4)).toBe("miss");
});
