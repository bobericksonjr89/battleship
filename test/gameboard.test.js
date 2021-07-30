const Gameboard = require("../src/gameboard.js");
const Ship = require("../src/ship.js");
//import Ship from "../src/ship.mjs";

test("ships fit within gameboard (1)", () => {
  const board = Gameboard();
  expect(board.placeShip(Ship(4, "battleship"), 6, 0, "horizontal")).toBe(true);
});

test("ships fit within gameboard (2)", () => {
  const board = Gameboard();
  expect(board.placeShip(Ship(2, "patrol"), 1, 1, "horizontal")).toBe(true);
});

test("ships fit within gameboard (3) ", () => {
  const board = Gameboard();
  expect(board.placeShip(Ship(5, "carrier"), 2, 3, "vertical")).toBe(true);
});

test("ships fit within gameboard (4)", () => {
  const board = Gameboard();
  expect(board.placeShip(Ship(3, "destroyer"), 9, 0, "horizontal")).toBe(false);
});

test("ships fit within gameboard (5)", () => {
  const board = Gameboard();
  expect(board.placeShip(Ship(4, "battleship"), 3, 7, "vertical")).toBe(false);
});

test("ships fit within gameboard (6)", () => {
  const board = Gameboard();
  expect(board.placeShip(Ship(5, "carrier"), 7, 6, "vertical")).toBe(false);
});

test("ships cannot be placed on one another", () => {
  const board = Gameboard();
  board.placeShip(Ship(4, "battleship"), 6, 0, "horizontal");
  expect(board.placeShip(Ship(4, "battleship"), 1, 1, "horizontal")).toBe(true);
  expect(board.placeShip(Ship(5, "carrier"), 1, 1, "vertical")).toBe(false);
  expect(board.placeShip(Ship(5, "carrier"), 2, 0, "vertical")).toBe(false);
  expect(board.placeShip(Ship(5, "carrier"), 8, 3, "vertical")).toBe(true);
});

test("ships exist on board", () => {
  const board = Gameboard();
  board.placeShip(Ship(4, "battleship"), 6, 0, "horizontal");
  expect(board.board[6][0]).toBeTruthy();
  expect(board.board[6][2]).toBeFalsy();
  expect(board.board[8][0]).toBeTruthy();
  expect(board.board[1][0]).toBeFalsy();
});

test.todo("hits are recorded as hits");

test.todo("misses are recorded as misses");

test.todo("gameboard reports when all ships sunk");

/* const board = new Gameboard()
board.add(new BattleShip("A","8","vertical"))
expect(board.getCoords("A","8")).toBe(PARTOFTHESHIP) */

/* obviously i'm making assumptions about how you're setting things up... 
but if you can add things to your board, you should be able to also GET things from your board.  
SO testing is: add thing to board, then make sure it's there. */
