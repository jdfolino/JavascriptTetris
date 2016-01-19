if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisGame = require("../../lib/tetris")
var Grid = require("../../lib/grid")
var LongBar = require("../../lib/pieces/longBar")

var GAME_MOVES = {
    DOWN: {move: 'down', x_transformation: 0, y_transformation: -1},
    LEFT: {move: 'left', x_transformation: -1, y_transformation: 0},
    RIGHT: {move: 'right', x_transformation: 1, y_transformation: 0},
    ROTATE_ANTI_CLOCKWISE: {move: 'rotateAntiClockwise', x_transformation: 0, y_transformation: 0},
    ROTATE_CLOCKWISE: {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0}
}

QUnit.test("Tetris Game should initiate witha queue of 4 pieces", function (assert) {
    var tetrisGame = new TetrisGame(new Grid(10, 10), 1);
    assert.equal(4, tetrisGame.pieceQueue.length, "failed!");
});


QUnit.test("it should not allow to a piece to rotate clockwise if it falls off the grid", function (assert) {
    var grid = new Grid(5, 5);
    var longBar = new LongBar(4, 0, 0);
    var gameController = new TetrisGame(grid, 0, longBar);
    var result = gameController.tryMove(longBar,
        {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0}
    );
    assert.equal(false, result, "failed");
});

QUnit.test("should allow a piece to rotate if it does not fall off the grid", function (assert) {
    var piece = new LongBar(0, 0, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisGame(grid, 0, piece);
    var result = gameController.tryMove(piece, {move: 'rotateClockwise', x_transformation: 0, y_transformation: 0});
    assert.equal(true, result, 'false');
});

QUnit.test("should not allow pieces to fall of the grid going SOUTH", function (assert) {
    var piece = new LongBar(0, 0, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisGame(grid, 0, piece);
    var result = gameController.tryMove(piece, GAME_MOVES.DOWN);
    assert.equal(false, result, 'failed');
});

QUnit.test("should not allow pieces to fall of the grid going WEST", function (assert) {
    var piece = new LongBar(0, 0, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisGame(grid, 0, piece);
    var result = gameController.tryMove(piece, GAME_MOVES.LEFT);
    assert.equal(false, result, 'failed');
});


QUnit.test("should not allow pieces to fall of the grid going EAST", function (assert) {
    var piece = new LongBar(0, 5, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisGame(grid, 0, piece);
    var result = gameController.tryMove(piece, GAME_MOVES.RIGHT);
    assert.equal(false, result, 'failed');
});

QUnit.test("should not allow pieces to fall of the grid going EAST (Part II)", function (assert) {
    var piece = new LongBar(5, 5, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisGame(grid, 0, piece);
    var result = gameController.tryMove(piece, GAME_MOVES.RIGHT);
    assert.equal(false, result, 'failed');
});


QUnit.test("should explode single lines", function (assert) {
    var grid = new Grid(2, 2);
    grid.rows = [
        [true, true],
        [false, false]];
    var gameController = new TetrisGame(grid);
    gameController.explodeCompleteLines(0);
    assert.deepEqual([[false, false], [false, false]], grid.rows, 'failed');
    ;
});

QUnit.test("should explode 2 lines", function (assert) {
    var grid = new Grid(2, 2);
    grid.rows = [
        [true, true],
        [true, true],
        [false, false]];
    var gameController = new TetrisGame(grid);
    gameController.explodeCompleteLines(0);
    assert.deepEqual([[false, false], [false, false], [false, false]], grid.rows, 'failed');
    ;
});

QUnit.test("should explode 2 lines that are not adjacent", function (assert) {
    var grid = new Grid(2, 2);
    grid.rows = [
        [true, true],
        [false, true],
        [true, true]];
    var gameController = new TetrisGame(grid);
    gameController.explodeCompleteLines(0);
    assert.deepEqual([[false, true], [false, false], [false, false]], grid.rows, 'failed');
    ;
});


QUnit.test("should fill the grid (Part I)", function (assert) {
    var piece = new LongBar(0, 0, 0);
    var grid = new Grid(5, 5);
    var gameController = new TetrisGame(grid);
    gameController.fill(piece);
    assert.deepEqual(true, grid.rows[0][0], 'failed');
    assert.deepEqual(true, grid.rows[1][0], 'failed');
    assert.deepEqual(true, grid.rows[2][0], 'failed');
    assert.deepEqual(true, grid.rows[3][0], 'failed');
});

QUnit.test("should fill the grid (Part II)", function (assert) {
    var piece = new LongBar(3, 3, 0);
    var grid = new Grid(10, 10);
    var gameController = new TetrisGame(grid);
    gameController.fill(piece);
    assert.deepEqual(true, grid.rows[3][3], 'failed');
    assert.deepEqual(true, grid.rows[4][3], 'failed');
    assert.deepEqual(true, grid.rows[5][3], 'failed');
    assert.deepEqual(true, grid.rows[6][3], 'failed');
});

QUnit.test("should fill the grid (Part III)", function (assert) {
    var piece = new LongBar(1, 3, 90);
    var grid = new Grid(10, 10);
    var gameController = new TetrisGame(grid);

    assert.deepEqual(true, gameController.fill(piece), 'failed');
    assert.deepEqual(true, grid.rows[3][1], 'failed');
    assert.deepEqual(true, grid.rows[3][2], 'failed');
    assert.deepEqual(true, grid.rows[3][3], 'failed');
    assert.deepEqual(true, grid.rows[3][4], 'failed');
});

QUnit.test("should not let you fill the grid if any part is already filled in", function (assert) {
    var piece = new LongBar(1, 3, 90);
    var grid = new Grid(10, 10);
    var gameController = new TetrisGame(grid);
    gameController.fill(piece);

    assert.equal(false, gameController.fill(piece), 'failed');
    assert.equal(true, grid.rows[3][2], 'failed');
    assert.equal(true, grid.rows[3][3], 'failed');
    assert.equal(true, grid.rows[3][4], 'failed');
});

QUnit.test("should remove pieces that make a line end to end horizontally", function (assert) {
    var piece = new LongBar(0, 0, 90);
    var piece2 = new LongBar(4, 0, 90);
    var grid = new Grid(8, 7);
    var gameController = new TetrisGame(grid);
    gameController.fill(piece);
    gameController.fill(piece2);
    gameController.explodeCompleteLines();
    assert.deepEqual(false, grid.rows[0][0], 'failed');
});

QUnit.test("should remove pieces that make a line end to end horizontally II", function (assert) {
    var piece = new LongBar(0, 0, 0);
    var piece2 = new LongBar(0, 4, 0);
    var grid = new Grid(8, 8);
    var gameController = new TetrisGame(grid);
    gameController.fill(piece);
    gameController.fill(piece2);
    gameController.explodeCompleteLines();
    console.log(grid.rows)
    //assert.equal(false, grid.rows[0][0], 'failed');
    assert.equal(false, grid.rows[0][1], 'failed');
});