function renderBoard(boardData, displayElement, interact) {
  for (let i = 0; i < boardData.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < boardData.length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (boardData[i][j] !== null) cell.classList.add("occupied");
      if (boardData[i][j] === 0) cell.classList.add("missed");
      if (boardData[i][j] === "x") cell.classList.add("hit");
      if (interact) {
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.classList.add("interact");
        cell.classList.remove("occupied");
      }
      row.appendChild(cell);
    }
    displayElement.appendChild(row);
  }
}

function handleBoardClick(board, event) {
  if (event.target.classList.contains("cell")) {
    const { row, col } = event.target.dataset;
    board.receiveAttack(row, col);
  }
}

export { renderBoard, handleBoardClick };
