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

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

printBoard(playerBoard, 'Player Board');
printBoard(bombBoard, 'Bomb Board');