if (typeof QUnit == 'undefined') // if your tests also run in the browser...
    QUnit = require('qunit-cli');

var TetrisGame = require("../../lib/tetris")
var Grid = require("../../lib/grid")
var LongBar = require("../../lib/pieces/longBar")


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

QUnit.test("should remove pieces that make a line end to end horizontally II", function (assert) {
    var piece = new LongBar(0, 0, 0);
    var piece2 = new LongBar(0, 4, 0);
    var grid = new Grid(8, 8);
    var gameController = new TetrisGame(grid);
    gameController.fill(piece);
    gameController.fill(piece2);
    gameController.explodeCompleteLines();
    //assert.equal(false, grid.rows[0][0], 'failed');
    assert.equal(false, grid.rows[0][1], 'failed');
});

//QUnit.test("should remove pieces that make a line end to end horizontally", function (assert) {
//    var piece = new LongBar(0, 0, 90);
//    var piece2 = new LongBar(4, 0, 90);
//    var grid = new Grid(8, 7);
//    var gameController = new TetrisGame(grid);
//    gameController.fill(piece);
//    gameController.fill(piece2);
//    gameController.explodeCompleteLines();
//    assert.deepEqual(false, grid.rows[0][0], 'failed');
//});

