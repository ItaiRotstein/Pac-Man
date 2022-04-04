'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWER_FOOD = '✨'
const CHERRY = '🍒'

var gBoard;

var gFoodCount = 0

var gAddCherryInterval

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    gAddCherryInterval = setInterval(addCherry, 15000, gBoard)
    printMat(gBoard, '.board-container')
    var elModal = document.querySelector('.modalGameOver')
    elModal.style.display = 'none'
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 && j === 1 || i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || i === SIZE - 2 && j === SIZE - 2) board[i][j] = POWER_FOOD
        }
    }
    return board;
}

function addCherry(board) {
    if (!gGame.isOn) {
        clearInterval(gAddCherryInterval)
        return
    }    
    var emptyCells = getEmptyCell(gBoard)
    var idx = getRandomIntInclusive(0, emptyCells.length-1)
    var cherryLocation = emptyCells[idx]
    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY
    renderCell(cherryLocation, CHERRY)
}

function getEmptyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === EMPTY) {
                var cell = {i, j}
                emptyCells.push(cell) 
            }
        }
    }
    return emptyCells
}

function updateScore(diff) {
    // DONE: update model and dom

    // Model
    gGame.score += diff
    //DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over');
    // TODO
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '☠')
    var elModal = document.querySelector('.modalGameOver')
    elModal.style.display = 'initial'
    gGame.isOn = false
}

function winGame() {
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🥳')
    var elModalVictory = document.querySelector('.modalVictory')
    elModalVictory.style.display = 'initial'
    var gFoodCount = -1
    gGame.isOn = false
}



