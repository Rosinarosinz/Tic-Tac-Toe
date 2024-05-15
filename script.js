const board = document.getElementById("game-board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset-button");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.querySelector(".result-message");
const restartButton = document.getElementById("restart-button");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

function handleCellClick(index) {
  if (gameState[index] === "" && !checkWinner()) {
    gameState[index] = currentPlayer;
    renderBoard();
    if (!checkWinner() && !checkDraw()) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] !== "" && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      showResultScreen(`Player ${currentPlayer} wins!`);
      return true;
    }
  }

  return false;
}

function checkDraw() {
  if (!gameState.includes("")) {
    showResultScreen("It's a draw!");
    return true;
  }
  return false;
}

function resetGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  status.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function showResultScreen(message) {
  resultMessage.textContent = message;
  resultScreen.style.display = "flex";
}

function hideResultScreen() {
  resultScreen.style.display = "none";
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cellElement);
  });
}

resetButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", () => {
  hideResultScreen();
  resetGame();
});

resetGame();
