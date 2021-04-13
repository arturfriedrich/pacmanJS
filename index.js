const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
let squares = []
let score = 0

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty


/* I made my layout using Microsoft Excel, then I exported the excel sheet in .txt format
   and spaced out with tabulators. I wrote a python program to change the tabulators to
   commas. Here is the python program:

   text = open("your-sheet.txt")

    for num in text:
        num = num.strip().split()
        num = list(map(int, num))
        print(num)

    text.close() */

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
    1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1,
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
        case 40:
            console.log("down pressed")
            if (!squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair") &&
                pacmanCurrentIndex + width < width * width
            )
                pacmanCurrentIndex += width
            break

        case 38:
            console.log("up pressed")
            if (!squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                pacmanCurrentIndex - 28 >= 0
            )
                pacmanCurrentIndex -= width
            break

        case 37:
            console.log("left pressed")
            if (!squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                pacmanCurrentIndex % width !== 0
            )
                pacmanCurrentIndex -= 1
            // shortcut
            if (pacmanCurrentIndex === 392) {
                pacmanCurrentIndex = 419
            }
            break

        case 39:
            console.log("right pressed")
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
}
document.addEventListener("keydown", control)

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        squares[pacmanCurrentIndex].classList.remove("pac-dot")
        score += 1
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

    }, ghost.speed)

}