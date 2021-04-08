document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    let width = 10;
    let squares = [];
    let bombAmount = 20;
    let isGameOver = false
    let flags = 0


    function createBoard() {

        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * width - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray)
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)
            square.addEventListener('click', function (e) {
                click(square)

            })
            square.oncontextmenu = function (e) {
                e.preventDefault()
                addFlag(square)
            }
        }

        for (let i = 0; i < squares.length; i++) {
            const leftEdge = (i % width === 0);
            const rightEdge = (i % width === width - 1)
            let total = 0
            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !leftEdge && squares[i - 1].classList.contains('bomb')) total++
                if (i > width - 1 && !rightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
                if (i > width && squares[i - width].classList.contains('bomb')) total++
                if (i > width + 1 && !leftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
                if (i < width * width - 2 && !rightEdge && squares[i + 1].classList.contains('bomb')) total++
                if (i < width * width - width && !leftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
                if (i < width * width - width - 2 && !rightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
                if (i < width * width - width - 1 && squares[i + width].classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)
                console.log(squares[i])

            }
        }

    }

    createBoard()

    function addFlag(square) {
        if (isGameOver) return
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = 'flag'
                flags++
                checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = '';
                flags--
            }
        }

    }

    function click(square) {
        let currentId = square.id
        if (isGameOver) reutrn
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')

    }

    function checkSquare(square, currentId) {
        const leftEdge = (currentId % width === 0);
        const rightEdge = (currentId % width === width - 1)
        setTimeout(() => {
            if (currentId > 0 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > width - 1 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)

            }
            if (currentId > width) {
                const newId = squares[parseInt(currentId) - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > width + 1 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < width * width - width && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < width * width - 2 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < width * width - width - 2 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < width * width - width - 1) {
                const newId = squares[parseInt(currentId) + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

        }, 10)

    }

    function gameOver(square) {
        gameOver = true

        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = 'bomb'
            }
        })
    }


    function checkForWin() {
        let matches = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++
            }
            if (matches === bombAmount) {
                alert('Winner')
                isGameOver(true)
            }
        }
    }
})