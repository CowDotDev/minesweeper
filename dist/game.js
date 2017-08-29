'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the dist directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numOfRows, numOfColumns, numOfBombs) {
        _classCallCheck(this, Game);

        this._board = new _board.Board(numOfRows, numOfColumns, numOfBombs);
    }

    _createClass(Game, [{
        key: 'playMove',
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