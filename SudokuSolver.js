const size = 9;

const unsolveableBoard = [
    [2, 0, 0, 9, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [5, 0, 2, 6, 0, 0, 4, 0, 7],
    [0, 0, 0, 0, 0, 4, 1, 0, 0],
    [0, 0, 0, 0, 9, 8, 0, 2, 3],
    [0, 0, 0, 0, 0, 3, 0, 8, 0],
    [0, 0, 5, 0, 1, 0, 0, 0, 0],
    [0, 0, 7, 0, 0, 0, 0, 0, 0]
]

const solveableBoard = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
] 

function tryBoard(board, boardName) {
    console.log("")
    console.time(`${boardName} Solved in`)
    if (solve(board)) {
        console.log(`Solved successfully ${boardName}`)
    } else {
        console.error(`Failed to solve ${boardName}`)
    }
    console.timeEnd(`${boardName} Solved in`)
    printBoard(board)
}

tryBoard(unsolveableBoard, "unsolveableBoard")
tryBoard(solveableBoard, "solveableBoard")

/**
 * 
 * @param {*} board     the board to check
 * @param {*} row       the row to place the number in
 * @param {*} number  the number to place
 * @return  true if number can be placed in row
 *          false if number already exists in row
 */
function isValidRow(board, row, number) {
    for (let i = 0; i < size; i++) {
        if (board[row][i] === number) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {*} board     the board to check
 * @param {*} column       the column to place the number in
 * @param {*} number  the number to place
 * @return  true if number can be placed in column
 *          false if number already exists in column
 */
function isValidColumn(board, column, number) {
    for (let i = 0; i < size; i++) {
        if (board[i][column] === number) {
            return false;
        }
    }
    return true;
}

/**
 * 
 * @param {*} board     the board to check
 * @param {*} row       the row to place the number in
 * @param {*} column  the column to place the number in
 * @param {*} number  the number to place
 * @return  true if number can be placed in 3x3 box
 *          false if number already exists in 3x3 box
 */
function isValidBox(board, row, column, number) {
    const boxRow = row - row % 3;
    const boxColumn = column - column % 3;

    for (let i = boxRow; i <= boxRow + 2; i++) {
        for (let j = boxColumn; j <= boxColumn + 2; j++) {
            if (board[i][j] === number) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 
 * @param {*} board     the board to check
 * @param {*} row       the row to place the number in
 * @param {*} column  the column to place the number in
 * @param {*} number  the number to place
 * @return  true if number can be placed in column, row and box (board)
 *          false if number can not be placed in column, row and box (board)
 */
function isValid(board, row, column, number) {
    return isValidRow(board, row, number) &&
        isValidColumn(board, column, number) &&
        isValidBox(board, row, column, number);
}

function printBoard(board) {
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            process.stdout.write(board[row][column] + " ")
        }
        console.log()
    }
}

/**
 * 
 * @param {*} board the board to solve
 */
function solve(board) {
    for (let row = 0; row < size; row++) {
        for (let column = 0; column < size; column++) {
            // only change numbers that are empty (equal 0)
            if (board[row][column] !== 0) continue;
            // try all numbers
            for (let number = 1; number <= size; number++) {
                if (isValid(board, row, column, number)) {
                    // put number if it can be placed
                    board[row][column] = number;
                    // solve board with new value
                    if (solve(board)) {
                        return true;
                    } else {
                        // revert the change
                        board[row][column] = 0;
                    }
                }
            }
            return false;
        }
    }
    return true;
}