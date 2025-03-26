// Function to generate a valid Sudoku puzzle
function generateSudoku() {
    fetch("https://sugoku.onrender.com/board?difficulty=medium")
        .then(response => response.json())
        .then(data => {
            createBoard(data.board);
            window.correctSolution = JSON.parse(JSON.stringify(data.board)); // Store for validation
        })
        .catch(error => console.error("Error fetching puzzle:", error));
}

// Function to create Sudoku board dynamically
function createBoard(board) {
    const boardContainer = document.getElementById("sudoku-board");
    boardContainer.innerHTML = ""; // Clear existing board

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            if (board[row][col] !== 0) {
                cell.textContent = board[row][col];
                cell.setAttribute("contenteditable", "false");
            } else {
                cell.setAttribute("contenteditable", "true");
            }

            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("input", validateInput);
            boardContainer.appendChild(cell);
        }
    }
}

// Function to validate user input (only 1-9 allowed)
function validateInput(event) {
    let value = event.target.textContent;
    if (!/^[1-9]$/.test(value)) {
        event.target.textContent = "";
    }
}

// Function to check user's solution
function checkSolution() {
    const cells = document.querySelectorAll(".cell");
    let correct = true;

    cells.forEach(cell => {
        let row = cell.dataset.row;
        let col = cell.dataset.col;
        let value = cell.textContent;
        if (value == "" || parseInt(value) !== window.correctSolution[row][col]) {
            correct = false;
        }
    });

    document.getElementById("result").textContent = correct ? "Correct Solution!" : "Incorrect, try again!";
}

// Load a new puzzle when the page loads
window.onload = generateSudoku;