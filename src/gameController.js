import Player from "./player";

function initGame() {
  const human = Player();
  const computer = Player();

  const humanBoardData = human.gameBoard;
  const computerBoardData = computer.gameBoard;

  return { humanBoardData, computerBoardData };
}

export { initGame };
