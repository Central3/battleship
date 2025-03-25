import gameBoard from "../gameBoard";

let testGameBoard;
let carrier, battleship, destroyer, submarine, patrolBoat;

beforeAll(() => {
  testGameBoard = gameBoard();
  [carrier, battleship, destroyer, submarine, patrolBoat] =
    testGameBoard.testFleet;
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

describe("Attack ship", () => {
  it("should return 'Out of bounds' if the coordinates are not in the board", () => {
    expect(testGameBoard.receiveAttack(-5, 12)).toEqual("Out of bounds");
  });

  it("should return 'Already hit' and not consider if it's already been hit", () => {
    testGameBoard.receiveAttack(0, 0);
    expect(testGameBoard.receiveAttack(0, 0)).toMatch("Already hit");
  });

  it("should return 'Already hit' and not consider if it's already been hit", () => {
    testGameBoard.placeFleet();
    testGameBoard.receiveAttack(0, 0);
    expect(testGameBoard.receiveAttack(0, 0)).toMatch("Already hit");
  });

  it("should return the coordinates of the attack", () => {
    expect(testGameBoard.receiveAttack(0, 2)).toEqual({ row: 0, col: 2 });
  });

  it("should have hit a ship with a hit property and record the hit", () => {
    testGameBoard.placeShip(battleship, 0, 0, "y");
    testGameBoard.placeShip(submarine, 0, 3, "x");
    let hitBattleship = testGameBoard.receiveAttack(0, 0);
    hitBattleship = testGameBoard.receiveAttack(1, 0);
    let hitSubmarine = testGameBoard.receiveAttack(0, 4);
    expect(hitBattleship).toBe(2);
    expect(hitSubmarine).toBe(1);
    expect(testGameBoard.board[0][0]).toMatch("x");
  });
});

describe("All ships sunk", () => {
  it("should report whether all ships are sunk", () => {
    expect(testGameBoard.isAllShipsSunk()).toBe(false);
  });

  it("should report whether all ships are sunk", () => {
    testGameBoard.placeFleet();

    for (let i = 0; i < 10; i++)
      for (let j = 0; j < 10; j++) testGameBoard.receiveAttack(i, j);

    expect(testGameBoard.isAllShipsSunk()).toBe(true);
  });
});
