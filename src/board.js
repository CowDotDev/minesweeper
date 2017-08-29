export class Board {
    constructor(numOfRows, numOfColumns, numOfBombs) {
        this._numOfBombs = numOfBombs;
        this._numOfTiles = numOfRows * numOfColumns;
        this._playerBoard = this.generatePlayerBoard(numOfRows, numOfColumns);
        this._bombBoard = this.generateBombBoard(numOfRows, numOfColumns, numOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex, degreeOfVariation) {
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
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
                        let tile = this._bombBoard[row][column];
                        if(tile === 'B') numberOfBombs++;
                    }
                }
            }
        }

        return numberOfBombs;
    }

    flipTile(rowIndex, columnIndex) {
        let playerTile = this._playerBoard[rowIndex][columnIndex];
        let bombTile = this._bombBoard[rowIndex][columnIndex];

        if(playerTile != ' ') {
            console.log('This tile has already been flipped!');
            return;
        } else if (bombTile === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex,1);
        }
        this._numOfTiles--;
    }

    hasSafeTile() {
        return (this._numOfTiles === this._numOfBombs);
    }

    printBoard(boardTitle) {
         console.log(boardTitle+'\n'+this._playerBoard.map((row) => row.join(' | ')).join('\n'));
    }

    generatePlayerBoard(numberOfRows, numberofColumns) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            board.push([]);
            for(let j = 0; j < numberofColumns; j++) {
                board[i].push(' ');
            }
        }
        return board;
    }

    generateBombBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for (let i = 0; i < numberOfRows; i++) {
            board.push([]);
            for(let j = 0; j < numberOfColumns; j++) {
                board[i].push(null);
            }
        }
        // Set Bombs onto Board
        let numberOfBombsPlaced = 0;
        while(numberOfBombsPlaced < this._numOfBombs) {
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            // Check if a bomb is already set
            if(board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }
};