'use strict'
let PACMAN = '<img src="img/up.png" width="30">';

var gPacman;

function createPacman(board) {
    // DONE
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    var nextLocation = getNextLocation(ev.key)
    // console.log(nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]


    // DONE: return if cannot move
    if (nextCell === WALL) return
    // DONE: hitting a ghost?  call gameOver

    if (nextCell === POWER_FOOD) {
        if (!gPacman.isSuper) getSuperPower()
        else return
    }

    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else {
            removeGhost(nextLocation)
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
        countFood()
    }

    if (nextCell === CHERRY) updateScore(10)

    // DONE: moving from current position:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // DONE: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function countFood() {

    var count = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === FOOD) {
                count++
            }
        }
    }
    gFoodCount = count
    gFoodCount--
    if (gFoodCount === 0) winGame()
}

function removeGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost.location.i === nextLocation.i
            && ghost.location.j === nextLocation.j) gGhosts.splice(i, 1)
    }
}

function getSuperPower() {
    gPacman.isSuper = true
    
    var ghostsColors = []
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        ghostsColors.push(ghost.color)
        ghost.color = '#c0c0c0'
    }

    setTimeout(() => {
        gPacman.isSuper = false
        for (var i = 0; i < gGhosts.length; i++) {
            var ghost = gGhosts[i]
            ghost.color = ghostsColors[i] 
        }
        if (gGhosts.length === 0) {
            clearInterval(gIntervalGhosts)
            createGhosts(gBoard);
        }
    }, 5000)
}

function getNextLocation(eventKey) {
    // DONE: figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKey) {
        case 'ArrowUp':
            nextLocation.i--
            // PACMAN = '<img src="img/up.png" width="30">'
            PACMAN = '<img src="img/up.png" width="30">'
            break;
        case 'ArrowRight':
            nextLocation.j++
            // PACMAN = '<img src="img/right.png" width="30">'
            PACMAN = '<img src="img/up.png" width="30" class="right">'

            break;
        case 'ArrowDown':
            nextLocation.i++
            PACMAN = '<img src="img/up.png" width="30" class="down">'
            // PACMAN = '<img src="img/down.png" width="30">'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            PACMAN = '<img src="img/up.png" width="30" class="left">'
            // PACMAN = '<img src="img/left.png" width="30">'
            break;

        default:
            return null;
    }

    return nextLocation;
}
