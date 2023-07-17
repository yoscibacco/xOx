// Define the game board
let board = ['', '', '', '', '', '', '', '', ''];

// Define winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

//Define players
/*const player = 'X';
const computer = 'O';
let currentPlayer = player;*/
const players = ['X', 'O'];
let currentPlayer = players[0];
let gameActive = true;

// Get DOM elements
const cells = Array.from(document.getElementsByClassName('cell'));

// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', makeMove));

// Function to make a move
function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        if (checkWin()) {
            gameActive = false;
            setTimeout(() => {
                alert(currentPlayer + ' wins!');
            }, 300);
            return;
        }
        if (checkTie()) {
            gameOver = false;
            setTimeout(() => {
                alert('It\'s a tie!');
            }, 300);
            return;
        }
        currentPlayer = players[(players.indexOf(currentPlayer) + 1) % players.length];
        if (currentPlayer === 'O') {
            computerMove();
        }
        /**/
    }
}

// Function for the computer's move
function computerMove() {
    let index = Math.floor(Math.random() * 9);
    while (board[index] !== '') {
        index = Math.floor(Math.random() * 9);
    }
    setTimeout(() => {
        makeMove(index);
    }, 300);
}

// Function to check for a win
function checkWin() {
    for (let combination of winningCombinations) {
        if (
            board[combination[0]] !== '' &&
            board[combination[0]] === board[combination[1]] &&
            board[combination[0]] === board[combination[2]]
        ) {
            return true;
        }
    }
    return false;
}


// Function to check for a tie
function checkTie() {
    return !board.includes('');
}

// Reset the game board
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = players[0];
    gameActive = true;
    cells.forEach(cell => {
      cell.innerText = '';
    });
  }
  