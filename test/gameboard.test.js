const Gameboard = require("../src/Gameboard.js");
const Ship = require("../src/Ship.js");
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

test("hits are recorded as hits", () => {
  const board = Gameboard();
  board.placeShip(Ship(4, "battleship"), 6, 0, "horizontal");
  board.placeShip(Ship(5, "carrier"), 1, 2, "vertical");
  expect(board.recieveAttack(5, 0)).toBe("miss");
  expect(board.recieveAttack(7, 0)).toBe("hit");
});

test("misses are recorded as misses", () => {
  const board = Gameboard();
  board.placeShip(Ship(4, "battleship"), 6, 0, "horizontal");
  board.placeShip(Ship(5, "carrier"), 1, 2, "vertical");
  expect(board.recieveAttack(5, 0)).toBe("miss");
  expect(board.board[5][0]).toEqual("miss");
});

test("gameboard reports when all ships sunk", () => {
  const board = Gameboard();
  board.placeShip(Ship(4, "battleship"), 6, 0, "horizontal");
  board.placeShip(Ship(2, "patrol"), 2, 2, "vertical");
  board.recieveAttack(6, 0);
  board.recieveAttack(7, 0);
  board.recieveAttack(8, 0);
  expect(board.allSunk()).toBe(false);
  board.recieveAttack(9, 0);
  expect(board.allSunk()).toBe(false);
  board.recieveAttack(2, 2);
  board.recieveAttack(2, 3);
  expect(board.allSunk()).toBe(true);
});
