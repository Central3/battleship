import Player from "./player";

function initGame() {
  const human = Player();
  const computer = Player();

  return { human, computer };
}

function computerMove(data) {
  let availableMoves = [];
  for (let row = 0; row < data.board.length; row++) {
    for (let col = 0; col < data.board.length; col++) {
      if (data.board[row][col] !== 0 && data.board[row][col] !== "x")
        availableMoves.push({ row, col });
    }
  }
  const randomMove =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];

  data.receiveAttack(randomMove.row, randomMove.col);
}

export { initGame, computerMove };
