const DOM = (() => {
  // DOM capture
  const playerBoard = document.querySelector(".player-info__board");
  const gameBoard = document.querySelector(".game-area__gameboard");
  const message = document.querySelector(".message-area__message");

  function displayPlayerBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let playerSpace = document.createElement("div");
        playerSpace.classList.add("player-info__player-space");
        playerSpace.dataset.x = j;
        playerSpace.dataset.y = i;
        playerBoard.appendChild(playerSpace);
      }
    }
  }

  function displayGameBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let gameSpace = document.createElement("div");
        gameSpace.classList.add("game-area__gameboard-space");
        gameSpace.dataset.x = j;
        gameSpace.dataset.y = i;
        gameBoard.appendChild(gameSpace);
      }
    }
  }

  function colorPlayerSpace(boat, x, y, direction) {
    let playerSpace;

    for (let i = 0; i < boat.length; i++) {
      if (direction === "horizontal") {
        playerSpace = document.querySelector(
          `.player-info__player-space[data-x='${x + i}'][data-y='${y}']`
        );
        playerSpace.classList.add("player-info__player-space--filled");
      }
      if (direction === "vertical") {
        playerSpace = document.querySelector(
          `.player-info__player-space[data-x='${x}'][data-y='${y + i}']`
        );
        playerSpace.classList.add("player-info__player-space--filled");
      }
    }
  }

  function displayHit(x, y) {
    const space = document.querySelector(
      `.game-area__gameboard-space[data-x='${x}'][data-y='${y}']`
    );
    space.classList.add("game-area__gameboard-space--hit");
    message.innerText = "A hit!";
  }

  function displayMiss(x, y) {
    const space = document.querySelector(
      `.game-area__gameboard-space[data-x='${x}'][data-y='${y}']`
    );
    space.classList.add("game-area__gameboard-space--miss");
    message.innerText = "A miss!";
  }

  function displayPlayerHit(x, y) {
    const space = document.querySelector(
      `.player-info__player-space[data-x='${x}'][data-y='${y}']`
    );
    space.classList.add("player-info__player-space--hit");
    message.innerText = "You're hit!";
  }

  function displayPlayerMiss(x, y) {
    const space = document.querySelector(
      `.player-info__player-space[data-x='${x}'][data-y='${y}']`
    );
    space.classList.add("player-info__player-space--miss");
    message.innerText = "Opponnent missed!";
  }

  function displaySunkShip(coordinates) {
    coordinates.forEach((coord) => {
      const space = document.querySelector(
        `.game-area__gameboard-space[data-x='${coord.x}'][data-y='${coord.y}']`
      );
      space.innerText = "☓";
    });
  }

  function displayWinner(winner) {
    if (winner === "player") {
      message.innerText = "You won!";
      return;
    }
    message.innerText = "Computer defeated you!";
  }

  displayPlayerBoard();
  displayGameBoard();

  return {
    colorPlayerSpace,
    displayHit,
    displayMiss,
    displayPlayerHit,
    displayPlayerMiss,
    displayWinner,
    displaySunkShip,
  };
})();

module.exports = DOM;
