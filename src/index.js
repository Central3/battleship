import "./style.css";
import { initGame } from "./gameController";
import { renderBoard, handleBoardClick } from "./UIController";

const playerBoardDisplay = document.querySelector(".player-game-board");
const computerBoardDisplay = document.querySelector(".computer-game-board");

const controller = new AbortController();

const { humanBoardData, computerBoardData } = initGame();
renderBoard(humanBoardData.board, playerBoardDisplay, false);
renderBoard(computerBoardData.board, computerBoardDisplay, true);

computerBoardDisplay.addEventListener(
  "click",
  (event) => {
    handleBoardClick(computerBoardData, event);
    updateScreen();
  },
  { signal: controller.signal },
);

function updateScreen() {
  computerBoardDisplay.textContent = "";
  renderBoard(computerBoardData.board, computerBoardDisplay, true);

  if (computerBoardData.isAllShipsSunk()) {
    console.log("Player won!!!");
    controller.abort();
  }
}
