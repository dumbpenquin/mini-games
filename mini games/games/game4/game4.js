document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const resetButton = document.querySelector(".reset-btn");
    
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    function checkWinner() {
        for (let combo of winningCombos) {
            let [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                statusText.textContent = `Player ${gameBoard[a]} Wins!`;
                isGameActive = false;
                return;
            }
        }
        if (!gameBoard.includes("")) {
            statusText.textContent = "It's a Draw!";
            isGameActive = false;
        }
    }

    function handleClick(e) {
        const index = e.target.dataset.index;
        if (gameBoard[index] === "" && isGameActive) {
            gameBoard[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = Player `${currentPlayer}'s turn`;
        }
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        statusText.textContent = "Player X's turn";
        isGameActive = true;
        currentPlayer = "X";
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
});