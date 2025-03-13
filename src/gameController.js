import Player from "./player";

function initGame() {
  const human = Player();
  const computer = Player();

  const humanBoardData = human.gameBoard;
  const computerBoardData = computer.gameBoard;
  humanBoardData.placeFleet();
  computerBoardData.placeFleet();

  return { humanBoardData, computerBoardData };
}

export { initGame };
