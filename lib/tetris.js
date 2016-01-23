(function () {
    'use strict';
}());

var Grid = require('./grid');
var PieceFactory = require('./pieces/pieceFactory');
var _ = require('../vendor/underscore');

module.exports = Tetris;

function Tetris(grid, starting_interval, pieceQueue) {

    this.getNextPiece = function () {
        this.activePiece = this.pieceQueue.shift();
        this.pieceQueue.push(this.createRandomPiece(this.grid));
        return this.activePiece;
    };

    this.createRandomPiece= function(grid){
        return createRandomPiece(grid);
    };

    function createRandomPiece(grid) {
        var piece = new PieceFactory().getPiece(grid);
        if (squaresAlreadyOccupied(piece, 0, 0)) {
            return false;
        }
        return piece;
    }

    function constructor() {
        if (grid === undefined) grid = new Grid(10, 20);
        if (starting_interval === undefined) starting_interval = 1;
        this.grid = grid;
        this.interval = starting_interval;
        this.stats = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0};
        this.linesCleared = 0;
        this.score = 0;
        if (pieceQueue === undefined){
            pieceQueue = [
                createRandomPiece(this.grid),
                createRandomPiece(this.grid),
                createRandomPiece(this.grid),
                createRandomPiece(this.grid)
            ];
        }
        this.pieceQueue = pieceQueue;
        this.getNextPiece();
    }
    constructor.call(this);

    var SCORING_SYSTEM = {
        0: 0,
        1: 100,
        2: 300,
        3: 500,
        4: 800
    };

    this.level = function () {
        return Math.floor(this.linesCleared / 10);
    };

    this.pieceHitsGround = function() {
        this.fill(this.activePiece);
        var noOfLinesExploded = this.explodeCompleteLines(0);
        this.stats[noOfLinesExploded]++;
        this.linesCleared = this.linesCleared + noOfLinesExploded;
        this.score = this.score + (SCORING_SYSTEM[noOfLinesExploded] * (this.level() + 1));
        return this.getNextPiece();
    };

    this.rotateClockwise = function (piece) {
        return this.tryMove('ROTATE_CLOCKWISE');
    };

    this.rotateAntiClockwise = function (piece) {
        return this.tryMove('ROTATE_ANTI_CLOCKWISE');
    };

    this.moveDown = function(piece) {
        return this.tryMove('DOWN');
    };

    this.moveLeft = function(piece) {
        return this.tryMove('LEFT');
    };

    this.moveRight = function(piece) {
        return this.tryMove('RIGHT');
    };

    this.fill = function(piece) {
        var coordinates = piece.gridItemsOccupied();

        for (var i = 0; i < coordinates.length; i++) {
            var x = coordinates[i][0];
            var y = coordinates[i][1];
            grid.rows[y][x] = true;
        }

        return true;
    };

    this.explodeCompleteLines = function (linesAlreadyExploded) {
        function findRowToDelete(grid) {
            var rows_to_delete = null;
            for (var i = 0; i < grid.rows.length; i++) {
                if (_.filter(grid.rows[i], function (cell) {
                        return cell === true;
                    }).length === grid.rows[i].length) {
                    rows_to_delete = i;
                    break;
                }
            }
            return rows_to_delete;
        }

        var row_to_delete = findRowToDelete(grid);
        if (row_to_delete === null) {
            return linesAlreadyExploded;
        }

        grid.rows.splice(row_to_delete, 1);
        grid.addNewRow();
        return this.explodeCompleteLines(linesAlreadyExploded + 1);

    };



    //////////
    //private
    //////////

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

     this.tryMove = function(commandKey) {
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