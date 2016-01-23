(function () {
    'use strict';
}());

var Tetris = require('./tetris');
var Grid = require('./grid');

module.exports = TetrisFactory;

function TetrisFactory() {

    this.create = function(grid, pieceQueue, starting_interval) {
        if (grid === undefined) grid = new Grid(10, 20);
        if (starting_interval === undefined) starting_interval = 1;
        var tetrisGame = new Tetris(grid, pieceQueue, starting_interval);
        tetrisGame.stats = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0};
        tetrisGame.linesCleared = 0;
        tetrisGame.starting_interval = starting_interval;
        tetrisGame.score = 0;
        return tetrisGame;
    };

}