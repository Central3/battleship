import player from "../player";

it("should have board property", () => {
  const player1 = player();
  expect(player1).toHaveProperty("gameBoard");
});
