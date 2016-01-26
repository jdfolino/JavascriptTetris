(function () {
    'use strict';
}());

var Tetris = require('./tetris');
var Grid = require('./grid');
var PieceFactory = require('./pieces/pieceFactory');

module.exports = TetrisFactory;

function TetrisFactory() {

    this.create = function(grid, pieceQueue, starting_interval) {
        if (grid === undefined) grid = new Grid(10, 20);
        if (starting_interval === undefined) starting_interval = 1;
        var tetrisGame = new Tetris(grid, pieceQueue, starting_interval);
        if (pieceQueue === undefined) {
            tetrisGame.pieceQueue = new PieceFactory().getPieceQueue(grid);
        }
        var SCORING_SYSTEM = {
            0: 0,
            1: 100,
            2: 300,
            3: 500,
            4: 800
        };
        tetrisGame.scoring_system = SCORING_SYSTEM;
        tetrisGame.getNextPiece();
        tetrisGame.stats = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0};
        tetrisGame.linesCleared = 0;
        tetrisGame.starting_interval = starting_interval;
        tetrisGame.score = 0;
        return tetrisGame;
    };

}