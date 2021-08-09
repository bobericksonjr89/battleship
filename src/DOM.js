const DOM = (() => {
  // DOM capture
  playerBoard = document.querySelector(".player-info__board");
  gameBoard = document.querySelector(".game-area__gameboard");

  function displayPlayerBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let playerSpace = document.createElement("div");
        playerSpace.classList.add("player-info__player-space");
        playerSpace.dataset.X = i;
        playerSpace.dataset.Y = j;
        playerBoard.appendChild(playerSpace);
      }
    }
  }

  function displayGameBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let gameSpace = document.createElement("div");
        gameSpace.classList.add("game-area__gameboard-space");
        gameSpace.dataset.X = i;
        gameSpace.dataset.Y = j;
        gameBoard.appendChild(gameSpace);
      }
    }
  }

  //gridDiv.appendChild(document.createElement("div")).classList.add("grid-box");

  displayPlayerBoard();
  displayGameBoard();
})();
