/*MainPage*/
function personToPerson() {
    document.getElementById('betweenWho').style.display = 'none';
    document.getElementById('gamePeople').style.display = 'block';
    document.getElementById('betweenWho').classList.add("fadeIn");
    document.getElementById('gamePeople').classList.add("fadeIn");
}

function personToComputer() {
    document.getElementById('betweenWho').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
    document.getElementById('betweenWho').classList.add("fadeIn");
    document.getElementById('settings').classList.add("fadeIn");
}


/*2 person*/
let boardPeople = ['', '', '', '', '', '', '', '', ''];
let moves = 0;
let curPlayer = 'X';
let gameIsActive = true;
const cellsPeople = Array.from(document.getElementsByClassName('cellPeople'));
// Add event listeners to each cell

function personMove(index) {
    if (gameIsActive && boardPeople[index] === '') {

        boardPeople[index] = curPlayer;
        moves++;
        cellsPeople[index].innerText = curPlayer;
        cellsPeople[index].style.backgroundColor = curPlayer === 'X' ? '#F3AA60' : '#A0BFE0';
        //document.getElementsByClassName('cellPeople')[index].textContent = curPlayer;


        if (checkWinner()) {
            gameIsActive = false;
            setTimeout(() => {
                announceWinner(curPlayer)
            }, 300);
            updateScorePeople();
            return;
        }

        if (moves === 9) {
            gameIsActive = false;
            announceDraw();
            return;
        }
        curPlayer = (curPlayer === 'X') ? 'O' : 'X';
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6] // diagonals
    ];

    for (let condition of winConditions) {
        if (
            boardPeople[condition[0]] !== '' &&
            boardPeople[condition[0]] === boardPeople[condition[1]] &&
            boardPeople[condition[0]] === boardPeople[condition[2]]
        ) {
            return true;
        }
    }

    return false;
}

function announceWinner(player) {
    //alert(`Player ${player} wins!`);

    Swal.fire({
        text: curPlayer + ' wins!',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#cc6b49',
    }).then(function () {

        boardPeople = ['', '', '', '', '', '', '', '', ''];
        curPlayer = 'X';
        gameIsActive = true;
        moves = 0;
        cellsPeople.forEach(c => {
            c.innerText = '';
            c.style.backgroundColor = '#FAF0D7';
        });

    });
}

function announceDraw() {
    //alert("It's a draw!");
    Swal.fire({
        text: 'It\'s a tie!',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#cc6b49',
    }).then(function () {

        boardPeople = ['', '', '', '', '', '', '', '', ''];
        curPlayer = 'X';
        gameIsActive = true;
        cellsPeople.forEach(c => {
            c.innerText = '';
            c.style.backgroundColor = '#FAF0D7';
        });

    });
}
/*ScoreBoardPeople*/
let scorePlayer1 = 0;
let scorePlayer2 = 0;

function updateScorePeople() {
    if (curPlayer === 'X') {
        scorePlayer1++;
        document.getElementById('player1').textContent = `${scorePlayer1}`;
    } else {
        scorePlayer2++;
        document.getElementById('player2').textContent = `${scorePlayer2}`;
    }
}

/*Reset Board People*/
function resetBoardPeople() {
    boardPeople = ['', '', '', '', '', '', '', '', ''];
    curPlayer = 'X';
    gameIsActive = true;
    moves = 0;
    cellsPeople.forEach(c => {
        c.innerText = '';
        c.style.backgroundColor = '#FAF0D7';
    });
}

/*AGAINST COMPUTER*/
//diff checked
const inps = document.querySelectorAll(".diffchck");
inps.forEach(e => e.addEventListener("click", ev => {
    inps.forEach(c => {
        if (c !== e) c.checked = false
    })
}))


$(function () {
    $('.diffchck').bind('click', function () {
        if ($(this).prop('checked') === false) {
            $(this).prop('checked', true);
        }
        $('.diffchck').not(this).prop("checked", false);
    });
});

//
let easy = document.getElementById('easy');
let hard = document.getElementById('hard');
//
// Switch to the game page
function startGame() {
    //difficultyLevel = document.getElementById('difficulty').value;
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player;
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('settings').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('settings').classList.add("fadeIn");
    document.getElementById('game').classList.add("fadeIn");
}


// Define the game board
let board = ['', '', '', '', '', '', '', '', ''];

// Define winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6] // Diagonals
];

//Define players
const player = 'X';
const computer = 'O';
let currentPlayer = player;

let gameActive = true;
let difficultyLevel = 'easy';

//score
let scorePlayerX = 0;
let scorePlayerO = 0;

// Get DOM elements
const cells = Array.from(document.getElementsByClassName('cell'));
const checkBox = document.getElementById("levelChoose");
// Add event listeners to each cell
cells.forEach(cell => cell.addEventListener('click', makeMove));

// Function to make a move
function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        cells[index].style.backgroundColor = currentPlayer === player ? '#F3AA60' : '#A0BFE0';
        if (checkWin()) {
            gameActive = false;
            setTimeout(() => {
                //                alert(currentPlayer + ' wins!');
                Swal.fire({
                    text: currentPlayer + ' wins!',
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#cc6b49',
                }).then(function () {

                    board = ['', '', '', '', '', '', '', '', ''];
                    currentPlayer = player;
                    gameActive = true;
                    cells.forEach(cell => {
                        cell.innerText = '';
                        cell.style.backgroundColor = '#FAF0D7';
                    });

                });
            }, 300);
            updateScore();
            return;
        }
        if (checkTie()) {
            gameActive = false;
            setTimeout(() => {
                //                alert('It\'s a tie!');
                Swal.fire({
                    text: 'It\'s a tie!',
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#cc6b49',
                }).then(function () {

                    board = ['', '', '', '', '', '', '', '', ''];
                    currentPlayer = player;
                    gameActive = true;
                    cells.forEach(cell => {
                        cell.innerText = '';
                        cell.style.backgroundColor = '#FAF0D7';
                    });

                });
            }, 300);
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === computer) {
            computerMove();
        }
        /**/
    }
}

// Function for the computer's move
function computerMoveEasy() {
    let index = Math.floor(Math.random() * 9);
    while (board[index] !== '') {
        index = Math.floor(Math.random() * 9);
    }
    setTimeout(() => {
        makeMove(index);
        cells[index].style.backgroundColor = '#A0BFE0';
    }, 300);
}

/* ---------------------------------------------------------- */
// Function for the computer's move (Medium Difficulty)



/* ---------------------------------------------------------- */

function computerMoveHard() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = currentPlayer;
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    setTimeout(() => {
        makeMove(bestMove);
    }, 300);
}

function minimax(board, depth, isMaximizing) {
    if (checkWin()) {
        return isMaximizing ? -10 + depth : 10 - depth;
    }
    if (checkTie()) {
        return 0;
    }
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = currentPlayer;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = currentPlayer === 'X' ? 'O' : 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}



/* ---------------------------------------------------------- */
/*function computerMove() {
    if (difficultyLevel === 'easy') {
        computerMoveEasy();
    } else if(difficultyLevel === 'hard') {
        computerMoveHard();
    } 
}
*/
function computerMove() {
    if (easy.checked == true) {
        computerMoveEasy();
    } else if (hard.checked == true) {
        computerMoveHard();
    }
}

/* ---------------------------------------------------------- */

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

function updateScore() {
    if (currentPlayer === 'X') {
        scorePlayerX++;
        document.getElementById('playerX').textContent = `${scorePlayerX}`;
    } else {
        scorePlayerO++;
        document.getElementById('playerO').textContent = `${scorePlayerO}`;
    }
}

// Reset the game board
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player;
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#FAF0D7';
    });
}


function backToComputerSettings() {
    document.getElementById('settings').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    cells.forEach(cell => {
        cell.style.backgroundColor = '#FAF0D7';
    });
    document.getElementById('playerX').textContent = `0`;
    document.getElementById('playerO').textContent = `0`;
    scorePlayerX = 0;
    scorePlayerO = 0;
}

function backToMain() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    document.getElementById('gamePeople').style.display = 'none';
    document.getElementById('betweenWho').style.display = 'flex';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#FAF0D7';
    });
    document.getElementById('playerX').textContent = `0`;
    document.getElementById('playerO').textContent = `0`;
    scorePlayerX = 0;
    scorePlayerO = 0;
    moves = 0;
    cellsPeople.forEach(c => {
        c.innerText = '';
        c.style.backgroundColor = '#FAF0D7';
    });
    document.getElementById('player1').textContent = `0`;
    document.getElementById('player2').textContent = `0`;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
}