function renderBoard(boardData, displayElement) {
  for (let i = 0; i < boardData.length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < boardData.length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    displayElement.appendChild(row);
  }
}

export { renderBoard };
