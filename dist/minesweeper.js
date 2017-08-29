"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numOfRows, numOfColumns, numOfBombs) {
        _classCallCheck(this, Game);

        this._board = new Board(numOfRows, numOfColumns, numOfBombs);
    }

    _createClass(Game, [{
        key: "playMove",
        value: function playMove(rowIndex, columnIndex) {
            if (rowIndex >= 0 && rowIndex < this._board._playerBoard.length && columnIndex >= 0 && columnIndex < this._board._playerBoard[0].length) {
                this._board.flipTile(rowIndex, columnIndex);
                if (this._board._playerBoard[rowIndex][columnIndex] === 'B') {
                    // The flipped tile was a Bomb!
                    this._board.printBoard("Game Over!");
                } else if (!this._board.hasSafeTile) {
                    // The flipped tile was the last safe tile... you win!
                    this._board.printBoard("You Win!");
                } else {
                    // The game continues...
                    this._board.printBoard("Current Board:");
                }
            } else {
                this._board.printBoard("Invalid Move! Current Board:");
            }
        }
    }]);

    return Game;
}();

var Board = function () {
    function Board(numOfRows, numOfColumns, numOfBombs) {
        _classCallCheck(this, Board);

        this._numOfBombs = numOfBombs;
        this._numOfTiles = numOfRows * numOfColumns;
        this._playerBoard = this.generatePlayerBoard(numOfRows, numOfColumns);
        this._bombBoard = this.generateBombBoard(numOfRows, numOfColumns, numOfBombs);
    }

    _createClass(Board, [{
        key: "getNumberOfNeighborBombs",
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex, degreeOfVariation) {
            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
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
                            var tile = this._bombBoard[row][column];
                            if (tile === 'B') numberOfBombs++;
                        }
                    }
                }
            }

            return numberOfBombs;
        }
    }, {
        key: "flipTile",
        value: function flipTile(rowIndex, columnIndex) {
            var playerTile = this._playerBoard[rowIndex][columnIndex];
            var bombTile = this._bombBoard[rowIndex][columnIndex];

            if (playerTile != ' ') {
                console.log('This tile has already been flipped!');
                return;
            } else if (bombTile === 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex, 1);
            }
            this._numOfTiles--;
        }
    }, {
        key: "hasSafeTile",
        value: function hasSafeTile() {
            return this._numOfTiles === this._numOfBombs;
        }
    }, {
        key: "printBoard",
        value: function printBoard(boardTitle) {
            console.log(boardTitle + '\n' + this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
    }, {
        key: "generatePlayerBoard",
        value: function generatePlayerBoard(numberOfRows, numberofColumns) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                board.push([]);
                for (var j = 0; j < numberofColumns; j++) {
                    board[i].push(' ');
                }
            }
            return board;
        }
    }, {
        key: "generateBombBoard",
        value: function generateBombBoard(numberOfRows, numberOfColumns) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                board.push([]);
                for (var j = 0; j < numberOfColumns; j++) {
                    board[i].push(null);
                }
            }
            // Set Bombs onto Board
            var numberOfBombsPlaced = 0;
            while (numberOfBombsPlaced < this._numOfBombs) {
                var randomRowIndex = Math.floor(Math.random() * numberOfRows);
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
                // Check if a bomb is already set
                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                    board[randomRowIndex][randomColumnIndex] = 'B';
                    numberOfBombsPlaced++;
                }
            }
            return board;
        }
    }, {
        key: "playerBoard",
        get: function get() {
            return this._playerBoard;
        }
    }]);

    return Board;
}();

;

// Let's Play!
var game = new Game(20, 20, 10);
game.playMove(20, 14);