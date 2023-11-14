const board = document.getElementById('board');
const winnerText = document.getElementById('winnerText');
const turnText = document.getElementById('turnText');
let currentPlayer = 'X';
let gameBoard = loadGame() || ['', '', '', '', '', '', '', '', ''];

function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (value === currentPlayer) {
            cell.classList.add('current-move');
        } else if (value === 'winner') {
            cell.classList.add('winner');
        } else if (value === 'draw') {
            cell.classList.add('draw');
        }
        cell.textContent = value;
        cell.addEventListener('click', () => cellClick(index));
        board.appendChild(cell);
    });
}

function cellClick(index) {
    if (gameBoard[index] === '' && !winnerText.textContent) {
        gameBoard[index] = currentPlayer;
        saveGame();
        renderBoard();
        checkWinner();
        togglePlayer();
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameBoard[a] = gameBoard[b] = gameBoard[c] = 'winner';
            saveGame();
            winnerText.textContent = `Игрок ${currentPlayer} выиграл!`;
            turnText.textContent = '';
            return;
        }
    }

    if (!gameBoard.includes('') && !winnerText.textContent) {
        winnerText.textContent = 'Ничья!';
        gameBoard.fill('draw');
        saveGame();
        renderBoard();
        turnText.textContent = '';
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (!winnerText.textContent) {
        turnText.textContent = `Ходит игрок ${currentPlayer}`;
    }
}

function startNewGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    turnText.textContent = `Ходит игрок ${currentPlayer}`;
    winnerText.textContent = '';
    saveGame();
    renderBoard();
}

function saveGame() {
    localStorage.setItem('ticTacToeGame', JSON.stringify(gameBoard));
}

function loadGame() {
    const savedGame = localStorage.getItem('ticTacToeGame');
    return savedGame ? JSON.parse(savedGame) : null;
}

renderBoard();
