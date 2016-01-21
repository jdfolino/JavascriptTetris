if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisGame = require("../../lib/tetris");
var Grid = require("../../lib/grid");
var LongBar = require("../../lib/pieces/longBar");

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

//QUnit.test("should not let you fill the grid if any part is already filled in", function (assert) {
//    var piece = new LongBar(1, 3, 90);
//    var grid = new Grid(10, 10);
//    var gameController = new TetrisGame(grid);
//    gameController.fill(piece);
//
//    assert.equal(false, gameController.fill(piece), 'failed');
//    assert.equal(true, grid.rows[3][2], 'failed');
//    assert.equal(true, grid.rows[3][3], 'failed');
//    assert.equal(true, grid.rows[3][4], 'failed');
//});

