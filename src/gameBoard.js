export default function gameBoard() {
  const boardDimension = 10;
  let board = [...Array(boardDimension)].map((row) =>
    Array(boardDimension).fill(null),
  );

  function isValidCoordinate(x, y) {
    return x > 0 && x < boardDimension && y > 0 && y < boardDimension;
  }

  function placeShip(ship, row, col, axis) {
    if (!isValidCoordinate(row, col)) return "Out of bounds";

    if (axis === "x") {
      if (col + ship.length > boardDimension) return "Invalid ship placement";
      for (let i = 0; i < ship.length; i++) {
        board[1][col + i] = 1;
      }
    } else {
      if (row + ship.length > boardDimension) return "Invalid ship placement";
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = 1;
      }
    }
    return board;
  }

  return { board, placeShip };
}
