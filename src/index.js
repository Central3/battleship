import "./style.css";
import { initGame } from "./gameController";
import { renderBoard } from "./UIController";

const playerBoardDisplay = document.querySelector(".player-game-board");
const computerBoardDisplay = document.querySelector(".computer-game-board");

const { humanBoardData, computerBoardData } = initGame();
renderBoard(humanBoardData.board, playerBoardDisplay);
renderBoard(computerBoardData.board, computerBoardDisplay);
