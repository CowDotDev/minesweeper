// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the dist directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
    constructor(numOfRows, numOfColumns, numOfBombs) {
        this._board = new Board(numOfRows, numOfColumns, numOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        if((rowIndex >= 0) && (rowIndex < this._board._playerBoard.length) && (columnIndex >= 0) && (columnIndex < this._board._playerBoard[0].length)) {
            this._board.flipTile(rowIndex, columnIndex);
            if(this._board._playerBoard[rowIndex][columnIndex] === 'B') {
                // The flipped tile was a Bomb!
                this._board.printBoard("Game Over!");
            } else if(!this._board.hasSafeTile) {
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
}