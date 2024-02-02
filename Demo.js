let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});

function createBoard() {
    const boardElement = document.getElementById('board');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        togglePlayer();
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
    });

    updateStatus();
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            displayWinner();
            return;
        }
    }

    if (!gameBoard.includes('')) {
        displayDraw();
    }
}

function displayWinner() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
}

function displayDraw() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = 'It\'s a draw!';
    gameActive = false;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    updateBoard();
    updateStatus();
}
