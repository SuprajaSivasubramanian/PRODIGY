// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsAIButton = document.getElementById('player-vs-ai');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isVsAI = false;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    updateCell(cell, index);
    checkForWinner();
    if (isVsAI && isGameActive) {
        aiMove();
    }
};

const updateCell = (cell, index) => {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.pointerEvents = 'none';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
        isGameActive = false;
    } else if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
    }
};

const aiMove = () => {
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const aiCell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    updateCell(aiCell, randomIndex);
    checkForWinner();
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playerVsPlayerButton.addEventListener('click', () => {
    isVsAI = false;
    resetGame();
});
playerVsAIButton.addEventListener('click', () => {
    isVsAI = true;
    resetGame();
});
