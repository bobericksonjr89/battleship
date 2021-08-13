const DOM = (() => {
  // DOM capture
  const playerBoard = document.querySelector(".player-info__board");
  const gameBoard = document.querySelector(".game-area__gameboard");
  const message = document.querySelector(".message-area__message");
  const playAgain = document.querySelector(".message-area__button");

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
    console.log(x, y);
    const space = document.querySelector(
      `.player-info__player-space[data-x='${x}'][data-y='${y}']`
    );
    console.log(space);
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
    } else {
      message.innerText = "Computer defeated you!";
    }

    playAgain.classList.add("message-area__button--visible");
  }

  function clearMessage() {
    message.innerText = "";
    playAgain.classList.remove("message-area__button--visible");
  }

  function clearBoards() {
    for (let i = 0; i < 100; i++) {
      gameBoard.children[i].classList.remove(
        "game-area__gameboard-space--hit",
        "game-area__gameboard-space--miss"
      );
      gameBoard.children[i].innerText = "";
      playerBoard.children[i].classList.remove(
        "player-info__player-space--filled",
        "player-info__player-space--hit",
        "player-info__player-space--miss"
      );
    }
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
    clearMessage,
    clearBoards,
  };
})();

module.exports = DOM;
