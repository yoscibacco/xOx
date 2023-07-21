//sweetalert


//diff checked
const inps=document.querySelectorAll(".diffchck");
inps.forEach(e=>e.addEventListener("click",ev=>{
  inps.forEach(c=>{if(c!==e) c.checked=false})
}))


$(function() { 
    $('.diffchck').bind('click',function() {
        if($(this).prop('checked') === false) {
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

function backToMain() {
    document.getElementById('settings').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    cells.forEach(cell => {
        cell.style.backgroundColor = '#FAF0D7';
      });
}

// Define the game board
let board = ['', '', '', '', '', '', '', '', ''];

// Define winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

//Define players
const player = 'X';
const computer = 'O';
let currentPlayer = player;

let gameActive = true;
let difficultyLevel = 'easy';

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
                }).then(function() {
                
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
        if (checkTie()) {
            gameOver = false;
            setTimeout(() => {
//                alert('It\'s a tie!');
                Swal.fire({
                    text: 'It\'s a tie!',
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#cc6b49',
                }).then(function() {
                
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
    } else if(hard.checked == true) {
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
  

