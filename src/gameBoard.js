import ship from "./ship";

export default function gameBoard() {
  const boardDimension = 10;
  let board = [...Array(boardDimension)].map((row) =>
    Array(boardDimension).fill(null),
  );
  let testFleet = [ship(5), ship(4), ship(3), ship(3), ship(2)];

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

  function randomPlacement(ship, attempts = 0) {
    const alignment = ["x", "y"];
    const randomAlignment =
      alignment[Math.floor(Math.random() * alignment.length)];
    const randomRow = Math.floor(Math.random() * boardDimension);
    const randomCol = Math.floor(Math.random() * boardDimension);
    const result = placeShip(ship, randomRow, randomCol, randomAlignment);

    if (attempts > 50)
      throw new Error(
        "Unable to find a valid position after multiple attempts.",
      );

    if (
      result === "Invalid ship placement" ||
      result === "Out of bounds" ||
      result === "Overlapping"
    )
      return randomPlacement(ship, attempts + 1);
  }

  function placeFleet() {
    const [carrier, battleship, destroyer, submarine, patrolBoat] = testFleet;

    randomPlacement(carrier);
    randomPlacement(battleship);
    randomPlacement(destroyer);
    randomPlacement(submarine);
    randomPlacement(patrolBoat);
  }

  function isAllShipsSunk() {
    return testFleet.every((ship) => ship.isSunk());
  }

  function clearBoard() {
    board = [...Array(boardDimension)].map((row) =>
      Array(boardDimension).fill(null),
    );
    testFleet = [ship(5), ship(4), ship(3), ship(3), ship(2)];
  }

  function receiveAttack(row, col) {
    if (!isValidCoordinate(row, col)) return "Out of bounds";
    if (board[row][col] === 0 || board[row][col] === "x") return "Already hit";

    if (board[row][col] !== null) {
      const hitShip = board[row][col];
      board[row][col] = "x";
      return hitShip.hit();
    }
    board[row][col] = 0;
    return { row, col };
  }

  return {
    get board() {
      return board;
    },
    testFleet,
    placeShip,
    clearBoard,
    randomPlacement,
    placeFleet,
    isAllShipsSunk,
    receiveAttack,
  };
}
