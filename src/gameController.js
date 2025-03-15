import Player from "./player";

function initGame() {
  const human = Player();
  const computer = Player();

  human.gameBoard.placeFleet();
  computer.gameBoard.placeFleet();

  return { human, computer };
}

function computerMove(data) {
  const board = data.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== 0 && board[i][j] !== "x") {
        data.receiveAttack(i, j);
        return;
      }
    }
  }
}

export { initGame, computerMove };
