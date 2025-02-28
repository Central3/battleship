import ship from "../ship";

let newShip;
let length = 3;

beforeEach(() => {
  newShip = ship(length);
});

test("test if an unhit ship is sunk", () => {
  expect(newShip.isSunk()).toBeFalsy();
});

test("test if a completely hit ship has been sunk", () => {
  for (let i = 0; i < length; i++) newShip.hit();
  expect(newShip.isSunk()).toBeTruthy();
});

test("test if a ship is hit more times than its length", () => {
  newShip.hit();
  newShip.hit();
  newShip.hit();
  expect(newShip.hit()).toMatch("This ship is already sunk");
  expect(newShip.isSunk()).toBeTruthy();
});
