const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    gameboard.forEach((cell, index) => {
      createCell(cell, index);
    });

    const cells = document.querySelectorAll(`.square`);
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        console.log(index);
      });
    });
  };

  const clear = () => {
    const container = document.querySelector(".gameboard");
    container.innerHTML = "";
  };

  return {
    render,
    clear,
    gameboard,
  };
})();

function Player(name, marker) {
  return { name, marker };
}

const Game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const winnigCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (winner, marker) => {
    winnigCombos.forEach((combo) => {
      const [a, b, c] = combo;

      if (
        Gameboard.gameboard[a] === marker &&
        Gameboard.gameboard[b] === marker &&
        Gameboard.gameboard[c] === marker
      ) {
        gameOver = true;
        const message = document.querySelector(".js-message");
        message.textContent = `${winner} won the game`;
        Gameboard.clear();
      }
    });
  };

  const start = () => {
    gameOver = false;
    const playerOneElement = document.querySelector("#player1");
    const player1 = Player(playerOneElement.value, "X");
    playerOneElement.value = "";

    const playerTwoElement = document.querySelector("#player2");
    const player2 = Player(playerTwoElement.value, "O");
    players = [player1, player2];
    playerTwoElement.value = "";

    currentPlayer = players[0];

    Gameboard.clear();
    Gameboard.render();

    const cells = document.querySelectorAll(`.square`);
    const playerTurnName = document.querySelector(".js-message");
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!gameOver && cell && Gameboard.gameboard[index] === "") {
          playerTurnName.textContent = currentPlayer.name;
          Gameboard.gameboard[index] = currentPlayer.marker;
          cell.textContent = Gameboard.gameboard[index];
          checkWinner(currentPlayer.name, currentPlayer.marker);
          currentPlayer === players[0]
            ? (currentPlayer = players[1])
            : (currentPlayer = players[0]);
        }
      });
    });
  };

  return {
    start,
  };
})();

function createCell(index) {
  const container = document.querySelector(".gameboard");
  const cellElement = document.createElement("div");
  cellElement.classList.add(`square`);
  cellElement.dataset.index = index;
  container.appendChild(cellElement);
}

const startButton = document.querySelector(".js-start-button");
startButton.addEventListener("click", () => {
  Game.start();
});
