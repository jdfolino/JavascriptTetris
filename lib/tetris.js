'use strict';

var Grid = require('./grid');
var LongBar = require('./pieces/longBar');
var SquareBar = require('./pieces/squareBar');
var TBar = require('./pieces/tBar');
var LeftLBar = require('./pieces/leftLBar');
var LeftDownwardBar = require('./pieces/leftDownwardBar');
var RightLBar = require('./pieces/rightLBar');
var RightDownwardBar = require('./pieces/rightDownwardBar');



module.exports = function(grid, starting_interval) {

    function reverse(a) {
        var result = [];
        var len = a.length;
        for (var i = (len - 1); i >= 0; i--) {
            result.push(a[i]);
        }
        return result;
    }

    var random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    var GAME_MOVES = {
        DOWN: {move: 'down', x_transformation: 0, y_transformation: -1},
        LEFT: {move: 'left', x_transformation: -1, y_transformation: 0},
        RIGHT: {move: 'right', x_transformation: 1, y_transformation: 0},
        ROTATE_ANTI_CLOCKWISE: {move: 'rotateAntiClockwise', x_transformation: 0, y_transformation: 0},
        ROTATE_CLOCKWISE: {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0}
    }

    var SCORING_SYSTEM = {
        0: 0,
        1: 100,
        2: 300,
        3: 500,
        4: 800
    }

    this.grid = grid;
    this.interval = starting_interval;
    this.stats = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0
    }

    this.level = function () {
        return Math.floor(this.linesCleared / 10)
    }

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

    this.pieceHitsGround = function (piece) {
        this.fill(piece);
        var noOfLinesExploded = this.explodeCompleteLines(0)
        this.stats[noOfLinesExploded]++;
        this.linesCleared = this.linesCleared + noOfLinesExploded;
        this.score = this.score + (SCORING_SYSTEM[noOfLinesExploded] * (this.level() + 1));
        return this.getNextPiece();
    }

    this.createRandomPiece = function (grid) {
        var number = random(0, 6);
        var piece = null;
        switch (number) {
            case 0:
                piece = new SquareBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 1:
                piece = new LongBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 2:
                piece = new TBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 3:
                piece = new LeftDownwardBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 4:
                piece = new RightDownwardBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 5:
                piece = new LeftLBar(grid.x - 2, grid.y - 2, 180);
                break;
            case 6:
                piece = new RightLBar(grid.x - 2, grid.y - 2, 180);
                break;
        }

        if (squaresAlreadyOccupied(piece, 0, 0)) {
            return false;
        }

        return piece;
    };

    this.tryMove = function (piece, command) {
        var clone = piece.clone();
        clone[command.move]();
        var validMove = stillOnGrid(clone, 0, 0) &&
            squaresAlreadyOccupied(piece, command.x_transformation, command.y_transformation) == false;
        if (validMove) {
            piece[command.move]();
        }
        return validMove;
    };

    this.fill = function (piece) {
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
                        return cell == true
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

    }

    this.linesCleared = 0;
    this.score = 0;
    this.getNextPiece = function () {
        var newActivePiece = this.pieceQueue.shift();
        this.pieceQueue.push(this.createRandomPiece(this.grid));
        return newActivePiece;
    }
    this.pieceQueue = [
        this.createRandomPiece(this.grid),
        this.createRandomPiece(this.grid),
        this.createRandomPiece(this.grid),
        this.createRandomPiece(this.grid)
    ];
}