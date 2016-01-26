(function () {
    'use strict';
}());

var Grid = require('./grid');
var PieceFactory = require('./pieces/pieceFactory');

module.exports = Tetris;

function Tetris(grid, pieceQueue) {
    this.grid = grid;
    this.pieceQueue = pieceQueue;
    this.getNextPiece = function () {
        this.activePiece = this.pieceQueue.shift();
        this.pieceQueue.push(this.createRandomPiece(this.grid));
        return this.activePiece;
    };

    this.createRandomPiece = function (grid) {
        return createRandomPiece(grid);
    };

    function createRandomPiece(grid) {
        var piece = new PieceFactory().getPiece(grid);
        if (squaresAlreadyOccupied(piece, 0, 0)) {
            return false;
        }
        return piece;
    }

    this.level = function () {
        return Math.floor(this.linesCleared / 10);
    };

    this.pieceHitsGround = function() {
        this.grid.fill(this.activePiece);
        var noOfLinesExploded = grid.explodeCompleteLines(0);
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
        return this.tryMove('DOWN');
    };

    this.moveLeft = function() {
        return this.tryMove('LEFT');
    };

    this.moveRight = function() {
        return this.tryMove('RIGHT');
    };

    function stillOnGrid(piece, x_transformation, y_transformation) {
        var coordinates = piece.gridItemsOccupied();
        for (var i = 0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            if (y < 0 || y + y_transformation >= grid.y || x < 0 || x + x_transformation >= grid.x) {
                return false;
            }
        }
        return true;
    }

    function squaresAlreadyOccupied(piece, x_transformation, y_transformation) {
        var coordinates = piece.gridItemsOccupied();
        for (var i = 0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            if (grid.rows[y + y_transformation][x + x_transformation] === true) {
                return true;
            }
        }
        return false;
    }

    this.tryMove = function (commandKey) {
        var command = {
            'DOWN': {move: 'down', x_transformation: 0, y_transformation: -1},
            'LEFT': {move: 'left', x_transformation: -1, y_transformation: 0},
            'RIGHT': {move: 'right', x_transformation: 1, y_transformation: 0},
            'ROTATE_ANTI_CLOCKWISE': {move: 'rotateAntiClockwise', x_transformation: 0, y_transformation: 0},
            'ROTATE_CLOCKWISE': {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0}
        }[commandKey];

        var activePieceClone = this.activePiece.clone();
        activePieceClone[command.move]();
        var validMove = stillOnGrid(activePieceClone, 0, 0) &&
            squaresAlreadyOccupied(this.activePiece, command.x_transformation, command.y_transformation) === false;
        if (validMove) {
            this.activePiece[command.move]();
        }
        return validMove;
    };
}