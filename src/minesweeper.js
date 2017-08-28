// Board Functions
const generatePlayerBoard = (numberOfRows, numberofColumns) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        board.push([]);
        for(let j = 0; j < numberofColumns; j++) {
            board[i].push(' ');
        }
    }
    return board;
};
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        board.push([]);
        for(let j = 0; j < numberOfColumns; j++) {
            board[i].push(null);
        }
    }
    // Set Bombs onto Board
    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        // Check if a bomb is already set
        if(board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }

    return board;
};
const printBoard = (board, boardTitle) => console.log(boardTitle+': \n'+board.map((row) => row.join(' | ')).join('\n'));

// Interactive Functions
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex, degreeOfVariation) => {
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0; // Counter

    // Degrees of variation in rows to check (Search one row up and down | -1 -> 1)
    for(let rowVariation = -degreeOfVariation; rowVariation <= degreeOfVariation; rowVariation++) {
        let row = rowIndex + rowVariation;
        // Make sure we're in the bounds of our array
        if((row >= 0) && (row < numberOfRows)) {
            // Degrees of variation in columns to check (Search one column to the left and right | -1 -> 1)
            for(let columnVariation = -degreeOfVariation; columnVariation <= degreeOfVariation; columnVariation++) {
                let column = columnIndex + columnVariation;
                // Make sure we're in the bounds of our array
                if((column >= 0) && (column < numberOfRows)) {
                    let tile = bombBoard[row][column];
                    if(tile === 'B') numberOfBombs++;
                }
            }
        }
    }

    return numberOfBombs;
};
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    let playerTile = playerBoard[rowIndex][columnIndex];
    let bombTile = bombBoard[rowIndex][columnIndex];

    if(playerTile != ' ') {
        console.log('This tile has already been flipped!');
        return;
    } else if (bombTile === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard,rowIndex,columnIndex,1);
    }
};

// Let's Play!
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

printBoard(playerBoard, 'Player Board');
printBoard(bombBoard, 'Bomb Board');

flipTile(playerBoard,bombBoard,0,0);
printBoard(playerBoard, 'Updated Player Board');
