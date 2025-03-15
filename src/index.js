import "./style.css";
import { initGame, computerMove } from "./gameController";
import { renderBoard } from "./UIController";

const playerBoardDisplay = document.querySelector(".player-game-board");
const computerBoardDisplay = document.querySelector(".computer-game-board");

const controller = new AbortController();

const { human, computer } = initGame();
let humanBoardData = human.gameBoard;
let computerBoardData = computer.gameBoard;
let activePlayer = human;
renderBoard(humanBoardData.board, playerBoardDisplay, false);
renderBoard(computerBoardData.board, computerBoardDisplay, true);

computerBoardDisplay.addEventListener(
  "click",
  (event) => {
    if (event.target.classList.contains("cell") && activePlayer === human) {
      const { row, col } = event.target.dataset;
      if (
        computerBoardData.board[row][col] === 0 ||
        computerBoardData.board[row][col] === "x"
      )
        return;
      computerBoardData.receiveAttack(row, col);
      switchActivePlayer();
      updateScreen();
    }
  },
  { signal: controller.signal },
);

function switchActivePlayer() {
  activePlayer = activePlayer === human ? computer : human;
}

function updateScreen() {
  computerBoardDisplay.textContent = "";
  renderBoard(computerBoardData.board, computerBoardDisplay, true);

  if (activePlayer === computer) {
    computerMove(humanBoardData);
    playerBoardDisplay.textContent = "";
    renderBoard(humanBoardData.board, playerBoardDisplay, false);
    switchActivePlayer();
  }

  if (computerBoardData.isAllShipsSunk()) {
    console.log("Player won!!!");
    controller.abort();
  }

  if (humanBoardData.isAllShipsSunk()) {
    console.log("Computer won!!!");
    controller.abort();
  }
}
