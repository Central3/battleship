import "./style.css";
import { initGame, computerMove } from "./gameController";
import { renderBoard } from "./UIController";
import refreshIcon from "./icons/refresh-icon.svg";

const gameContainer = document.querySelector(".game-container");
const playerBoardDisplay = document.querySelector(".player-game-board");
const computerBoardDisplay = document.querySelector(".computer-game-board");

let placedFleet = false;

const { human, computer } = initGame();
const humanBoardData = human.gameBoard;
const computerBoardData = computer.gameBoard;
let activePlayer = human;
renderBoard(humanBoardData.board, playerBoardDisplay, false);
renderBoard(computerBoardData.board, computerBoardDisplay, true);

const refreshIconElement = new Image();
refreshIconElement.src = refreshIcon;
refreshIconElement.classList.add("reposition");
gameContainer.appendChild(refreshIconElement);

function handleBoardClick(event) {
  if (
    event.target.classList.contains("interact") &&
    activePlayer === human &&
    placedFleet
  ) {
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
}

refreshIconElement.addEventListener("click", () => {
  placedFleet = true;
  humanBoardData.clearBoard();
  humanBoardData.placeFleet();
  computerBoardData.clearBoard();
  computerBoardData.placeFleet();

  computerBoardDisplay.addEventListener("click", handleBoardClick);
  updateScreen();
});

function switchActivePlayer() {
  activePlayer = activePlayer === human ? computer : human;
}

function updateScreen() {
  computerBoardDisplay.textContent = "";
  renderBoard(computerBoardData.board, computerBoardDisplay, true);

  if (activePlayer === computer) {
    computerMove(humanBoardData);
    switchActivePlayer();
  }
  playerBoardDisplay.textContent = "";
  renderBoard(humanBoardData.board, playerBoardDisplay, false);

  if (computerBoardData.isAllShipsSunk() && humanBoardData.isAllShipsSunk()) {
    console.log("Draw!!!");
    computerBoardDisplay.removeEventListener("click", handleBoardClick);
  } else if (computerBoardData.isAllShipsSunk()) {
    console.log("Player won!!!");
    computerBoardDisplay.removeEventListener("click", handleBoardClick);
  } else if (humanBoardData.isAllShipsSunk()) {
    console.log("Computer won!!!");
    computerBoardDisplay.removeEventListener("click", handleBoardClick);
  }
}
