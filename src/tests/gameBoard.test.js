import gameBoard from "../gameBoard";
import ship from "../ship";

let testGameBoard;
let carrier, battleship, destroyer, submarine, patrolBoat;

beforeAll(() => {
  testGameBoard = gameBoard();
  [carrier, battleship, destroyer, submarine, patrolBoat] =
    testGameBoard.createTestFleet();
});

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
    testGameBoard.placeShip(carrier, 4, 1, "x");
    expect(testGameBoard.board[4].slice(1, 6)).toEqual([
      carrier,
      carrier,
      carrier,
      carrier,
      carrier,
    ]);
  });

  it("should place a ship vertically on the board", () => {
    testGameBoard.placeShip(destroyer, 1, 1, "y");
    expect(testGameBoard.board[1][1]).toBe(destroyer);
    expect(testGameBoard.board[2][1]).toBe(destroyer);
    expect(testGameBoard.board[3][1]).toBe(destroyer);
  });

  it("should return 'Out of bounds' when placing a ship outside the board", () => {
    expect(testGameBoard.placeShip(destroyer, -1, 15, "x")).toEqual(
      "Out of bounds",
    );
  });

  it("should return 'Invalid ship placement' when ship placement exceeds board boundaries", () => {
    expect(testGameBoard.placeShip(destroyer, 3, 8, "x")).toMatch(
      "Invalid ship placement",
    );
  });

  it("should return 'Invalid ship placement' when ship placement exceeds board boundaries", () => {
    expect(testGameBoard.placeShip(destroyer, 9, 9, "y")).toMatch(
      "Invalid ship placement",
    );
  });

  it("should return 'Overlapping' when ships are placed on top of each other", () => {
    testGameBoard.placeShip(carrier, 1, 1, "x");
    expect(testGameBoard.placeShip(destroyer, 0, 1, "y")).toMatch(
      "Overlapping",
    );
  });

  it("should return 'Overlapping' when ships are placed on top of each other", () => {
    testGameBoard.placeShip(carrier, 0, 1, "y");
    expect(testGameBoard.placeShip(destroyer, 1, 0, "x")).toMatch(
      "Overlapping",
    );
  });
});
