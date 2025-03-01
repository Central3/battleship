import gameBoard from "../gameBoard";
import ship from "../ship";

let testGameBoard;

beforeEach(() => {
  testGameBoard = gameBoard();
});

it("should initialize a 10x10 board with all cells set to null", () => {
  const boardDimension = 10;
  const expectedBoard = [...Array(boardDimension)].map((row) =>
    Array(boardDimension).fill(null),
  );
  expect(testGameBoard.board).toEqual(expectedBoard);
});

describe("Ship placement", () => {
  it("should place a ship horizontally on the board", () => {
    const carrier = ship(5);
    testGameBoard.placeShip(carrier, 1, 1, "x");
    expect(testGameBoard.board[1][1]).toBe(1);
    expect(testGameBoard.board[1][2]).toBe(1);
    expect(testGameBoard.board[1][3]).toBe(1);
    expect(testGameBoard.board[1][4]).toBe(1);
    expect(testGameBoard.board[1][5]).toBe(1);
  });

  it("should place a ship vertically on the board", () => {
    const destroyer = ship(3);
    testGameBoard.placeShip(destroyer, 1, 1, "y");
    expect(testGameBoard.board[1][1]).toBe(1);
    expect(testGameBoard.board[2][1]).toBe(1);
    expect(testGameBoard.board[3][1]).toBe(1);
  });

  it("should return 'Out of bounds' when placing a ship outside the board", () => {
    const destroyer = ship(3);
    expect(testGameBoard.placeShip(destroyer, -1, 15, "x")).toEqual(
      "Out of bounds",
    );
  });

  it("should return 'Invalid ship placement' when ship placement exceeds board boundaries", () => {
    const destroyer = ship(3);
    expect(testGameBoard.placeShip(destroyer, 9, 9, "y")).toEqual(
      "Invalid ship placement",
    );
  });
});
