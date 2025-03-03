import ship from "./ship";

export default function gameBoard() {
  const boardDimension = 10;
  let board = [...Array(boardDimension)].map((row) =>
    Array(boardDimension).fill(null),
  );

  function isValidCoordinate(x, y) {
    return x >= 0 && x < boardDimension && y >= 0 && y < boardDimension;
  }

  function placeShip(ship, row, col, axis) {
    if (!isValidCoordinate(row, col)) return "Out of bounds";

    if (axis === "x" && col + ship.length > boardDimension)
      return "Invalid ship placement";
    if (axis === "y" && row + ship.length > boardDimension)
      return "Invalid ship placement";

    const horizontalScan = board[row]
      .slice(col, col + ship.length)
      .find((cell) => cell !== null);

    const verticalScan = board
      .map((arr) => arr[col])
      .slice(row, row + ship.length)
      .find((cell) => cell !== null);

    if (axis === "x") {
      if (horizontalScan !== undefined) return "Overlapping";
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
      }
    } else {
      if (verticalScan !== undefined) return "Overlapping";
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
      }
    }
    return board;
  }

  return { board, placeShip, receiveAttack };
}
