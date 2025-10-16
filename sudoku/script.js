const boardElement = document.getElementById("board");
const newGameBtn = document.getElementById("newGame");
const difficultySelect = document.getElementById("difficulty");

function generateSudoku(level = "easy") {
  // Базовая решённая сетка
  const base = Array.from({ length: 9 }, (_, i) =>
    Array.from({ length: 9 }, (_, j) => ((i * 3 + Math.floor(i / 3) + j) % 9) + 1)
  );

  // Перемешивание строк, столбцов и блоков
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  const swapRows = (g) => {
    const res = [...g];
    for (let block = 0; block < 3; block++) {
      const offset = block * 3;
      const rows = [0, 1, 2].map((x) => offset + x);
      const shuffled = shuffle(rows);
      for (let i = 0; i < 3; i++) res[offset + i] = g[shuffled[i]];
    }
    return res;
  };
  const grid = swapRows(base);

  // Определяем количество пустых ячеек
  let empties = level === "easy" ? 30 : level === "medium" ? 45 : 55;

  const puzzle = grid.map((row) => [...row]);
  while (empties > 0) {
    const i = Math.floor(Math.random() * 9);
    const j = Math.floor(Math.random() * 9);
    if (puzzle[i][j] !== 0) {
      puzzle[i][j] = 0;
      empties--;
    }
  }

  renderBoard(puzzle);
}

function renderBoard(puzzle) {
  boardElement.innerHTML = "";
  puzzle.forEach((row, i) => {
    row.forEach((num, j) => {
      const cell = document.createElement("input");
      cell.type = "text";
      cell.maxLength = 1;
      cell.className = "cell";
      if (num !== 0) {
        cell.value = num;
        cell.disabled = true;
        cell.style.background = "#333";
      }
      boardElement.appendChild(cell);
    });
  });
}

newGameBtn.addEventListener("click", () => {
  const level = difficultySelect.value;
  generateSudoku(level);
});

// Стартовая игра
generateSudoku("easy");
