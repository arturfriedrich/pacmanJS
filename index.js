// author: Artúr Friedrich

const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0
let pacdot = 0

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
    1, 3, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 3, 1,
    1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 0, 1, 1, 1, 1,
    4, 4, 4, 4, 0, 0, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 0, 0, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
    1, 3, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 3, 1,
    1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

// creating the board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        // create square
        const square = document.createElement("div")
        // put square into the grid
        grid.appendChild(square)
        // put square in squeres array
        squares.push(square)

        // adding classes to the specific squares
        if (layout[i] === 0) {
            squares[i].classList.add("pac-dot")
        } else if (layout[i] === 1) {
            squares[i].classList.add("wall")
        } else if (layout[i] === 2) {
            squares[i].classList.add("ghost-lair")
        } else if (layout[i] === 3) {
            squares[i].classList.add("power-pellet")
        }
    }
}
createBoard()


// starting position of pacman
let pacmanCurrentIndex = 545
squares[pacmanCurrentIndex].classList.add("pacman")

// left - 37
// up key - 38
// right - 39
// down - 40

function control(e) {
    squares[pacmanCurrentIndex].classList.remove("pacman")
    switch (e.keyCode) {
        case 40:    // down
            if (!squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
                pacmanCurrentIndex + width < width * width
            )
                pacmanCurrentIndex += width
            break

        case 38:    // up
            if (!squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                pacmanCurrentIndex - 28 >= 0
            )
                pacmanCurrentIndex -= width
            break

        case 37:    // left
            if (!squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                pacmanCurrentIndex % width !== 0
            )
                pacmanCurrentIndex -= 1

            // shortcut
            if (pacmanCurrentIndex === 392) {
                pacmanCurrentIndex = 419
            }
            break

        case 39:    // right
            if (!squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                pacmanCurrentIndex % width < width - 1
            )
                pacmanCurrentIndex += 1

            // shortcut
            if (pacmanCurrentIndex === 419) {
                pacmanCurrentIndex = 392
            }
            break
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}
document.addEventListener("keydown", control)


function pacDotEaten() {
    // if square pacman is in a square with a pac-dot
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
        score += 1
        pacdot += 1
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {
    // if square pacman is in a square with a power pellet
    if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
        // removing power pellet when it is eaten
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
        // add 10 to the score
        score += 10
        // change isScared to true
        ghosts.forEach(ghost => ghost.isScared = true)
        // setTimeout to unscare after 10 seconds
        setTimeout(unScareGhosts, 10000)
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

// define ghosts
class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

// ghost attributes
const ghosts = [
    new Ghost("Blinky", 376, 250),
    new Ghost("Pinky", 404, 400),
    new Ghost("Inky", 379, 300),
    new Ghost("Clyde", 407, 500),
]

// draw ghost onto the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})

// move the ghosts
ghosts.forEach(ghost => moveGhosts(ghost))

function moveGhosts(ghost) {
    const directions = [+1, -1, +width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function () {
        // if the next square does NOT contain a wall and does not contain a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains("wall") &&
            !squares[ghost.currentIndex + direction].classList.contains("ghost")
        ) {
            // remove any ghost
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            // add direction to current index
            ghost.currentIndex += direction
            // add ghost class
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add("ghost")
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        // if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add("scared-ghost")
        }

        // if the ghost is scared and pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pacman")) {
            // remove classname - ghost.className, "ghost", "scared-ghost"
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
            // change ghosts currentIndex back to startIndex
            ghost.currentIndex = ghost.startIndex
            //add a score of 100
            score += 100
            // readd classname of ghost.className and "ghost" to the new position
            squares[ghost.currentIndex].classList.add("ghost")
        }
        powerPelletEaten()
        checkForWin()
        checkForGameOver()
    }, ghost.speed)

}

function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if (squares[pacmanCurrentIndex].classList.contains("ghost") &&
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove eventlistener from our control function
        document.removeEventListener("keydown", control)
        //tell user the game is over
        scoreDisplay.innerHTML = score
        document.getElementById("overlay-gameover").style.display = "block"
    }

}

function checkForWin() {
    if (pacdot === 286) {
        // stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        // remove the eventListener for the control function
        document.removeEventListener("keydown", control)
        // tell our user we have won
        scoreDisplay.innerHTML = score
        document.getElementById("overlay-win").style.display = "block"
    }
}
