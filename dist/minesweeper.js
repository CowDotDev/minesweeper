'use strict';

// Board Functions
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberofColumns) {
    var board = [];
    for (var i = 0; i < numberOfRows; i++) {
        board.push([]);
        for (var j = 0; j < numberofColumns; j++) {
            board[i].push(' ');
        }
    }
    return board;
};
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    var board = [];
    for (var i = 0; i < numberOfRows; i++) {
        board.push([]);
        for (var j = 0; j < numberOfColumns; j++) {
            board[i].push(null);
        }
    }
    // Set Bombs onto Board
    var numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        // Check if a bomb is already set
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }

    return board;
};
var printBoard = function printBoard(board, boardTitle) {
    return console.log(boardTitle + ': \n' + board.map(function (row) {
        return row.join(' | ');
    }).join('\n'));
};

// Interactive Functions
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex, degreeOfVariation) {
    var numberOfRows = bombBoard.length;
    var numberOfColumns = bombBoard[0].length;
    var numberOfBombs = 0; // Counter

    // Degrees of variation in rows to check (Search one row up and down | -1 -> 1)
    for (var rowVariation = -degreeOfVariation; rowVariation <= degreeOfVariation; rowVariation++) {
        var row = rowIndex + rowVariation;
        // Make sure we're in the bounds of our array
        if (row >= 0 && row < numberOfRows) {
            // Degrees of variation in columns to check (Search one column to the left and right | -1 -> 1)
            for (var columnVariation = -degreeOfVariation; columnVariation <= degreeOfVariation; columnVariation++) {
                var column = columnIndex + columnVariation;
                // Make sure we're in the bounds of our array
                if (column >= 0 && column < numberOfRows) {
                    var tile = bombBoard[row][column];
                    if (tile === 'B') numberOfBombs++;
                }
            }
        }
    }

    return numberOfBombs;
};
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
    var playerTile = playerBoard[rowIndex][columnIndex];
    var bombTile = bombBoard[rowIndex][columnIndex];

    if (playerTile != ' ') {
        console.log('This tile has already been flipped!');
        return;
    } else if (bombTile === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex, 1);
    }
};

// Let's Play!
var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

printBoard(playerBoard, 'Player Board');
printBoard(bombBoard, 'Bomb Board');

flipTile(playerBoard, bombBoard, 0, 0);
printBoard(playerBoard, 'Updated Player Board');