import GameBoard from "./gameBoard";

export default function player() {
  const gameBoard = GameBoard();
  return { gameBoard };
}
