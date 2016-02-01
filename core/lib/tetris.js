(function () {
    'use strict';
}());

var Grid = require('./grid');
var PieceFactory = require('./pieces/pieceFactory');

module.exports = Tetris;

function Tetris(grid, pieceQueue) {
    this.grid = grid;
    this.pieceQueue = pieceQueue;
    this.gameOver = false;

    this.getNextPiece = function () {
        this.activePiece = this.pieceQueue.shift();
        this.pieceQueue.push(this.createRandomPiece(this.grid));
        return this.activePiece;
    };

    this.createRandomPiece = function() {
        var piece = new PieceFactory().getPiece(this.grid);
        return piece;
    };

    this.level = function () {
        return Math.floor(this.linesCleared / 10);
    };

    this.updateGameOverStatus = function(){
        if (this.gameOver === true) { return; }
        var activePieceClone = this.activePiece.clone();
        activePieceClone.place(this.grid.x - 2, this.grid.y - 2, 180);
        if (this.squaresAlreadyOccupied(activePieceClone, 0, 0)) {
            this.gameOver = true;
        }
    };

    this.pieceHitsGround = function() {
        this.grid.fill(this.activePiece);
        var noOfLinesExploded = this.grid.explodeCompleteLines(0);
        this.stats[noOfLinesExploded]++;
        this.linesCleared = this.linesCleared + noOfLinesExploded;
        this.score = this.score + (this.scoring_system[noOfLinesExploded] * (this.level() + 1));
        return this.getNextPiece();
    };

    this.rotateClockwise = function() {
        return this.tryMove('ROTATE_CLOCKWISE');
    };

    this.rotateAntiClockwise = function() {
        return this.tryMove('ROTATE_ANTI_CLOCKWISE');
    };

    this.moveDown = function() {
        var move = this.tryMove('DOWN');
        this.updateGameOverStatus();
        return move;
    };

    this.moveLeft = function() {
        return this.tryMove('LEFT');
    };

    this.moveRight = function() {
        return this.tryMove('RIGHT');
    };

    this.stillOnGrid = function(piece, x_transformation, y_transformation) {
        var coordinates = piece.gridItemsOccupied();
        for (var i = 0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            if (y < 0 || y + y_transformation >= this.grid.y || x < 0 || x + x_transformation >= this.grid.x) {
                return false;
            }
        }
        return true;
    };

    this.squaresAlreadyOccupied = function(piece, x_transformation, y_transformation) {
        var coordinates = piece.gridItemsOccupied();
        for (var i = 0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            var coordinate = this.grid.rows[y + y_transformation][x + x_transformation];
            if (coordinate !== false) {
                return true;
            }
        }
        return false;
    };

    this.tryMove = function (commandKey){
        var command = {
            'DOWN': {move: 'down', x_transformation: 0, y_transformation: -1},
            'LEFT': {move: 'left', x_transformation: -1, y_transformation: 0},
            'RIGHT': {move: 'right', x_transformation: 1, y_transformation: 0},
            'ROTATE_ANTI_CLOCKWISE': {move: 'rotateAntiClockwise', x_transformation: 0, y_transformation: 0},
            'ROTATE_CLOCKWISE': {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0}
        }[commandKey];

        var activePieceClone = this.activePiece.clone();
        activePieceClone[command.move]();
        var validMove = this.stillOnGrid(activePieceClone, 0, 0) &&
            this.squaresAlreadyOccupied(this.activePiece, command.x_transformation, command.y_transformation) === false;
        if (validMove) {
            this.activePiece[command.move]();
        }
        return validMove;
    };
}